import "./scss/custom.scss";
var _ = require("lodash");
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";

import teleportApi from "./api/teleportApi";
import renderSeachbar from "./components/searchbar/searchbar";
import renderCityList from "./components/citiesList/citiesList";
import renderScoresList from "./components/scoresList/scoresList";
import renderErr from "./components/error/errorMessage";
import NoInfoAvailableError from "./noInfoError";

const searchbarID = "searchbar";
const cityInputID = "cityInp";
const searchCityBtnID = "searchCityBtn";
const citiesListID = "citiesList";
const cityScoresID = "scores";
const errorMsgID = "error";

function startPage(elem) {
  elem.insertAdjacentHTML(
    "beforeend",
    renderSeachbar(searchbarID, cityInputID, searchCityBtnID)
  );

  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", () => {
    // inserire div di errore
    // cleaner(citiesListID, cityScoresID, errorMsgID);
    // get input.value

    const cityToSearch = document.getElementById(cityInputID).value;
    setCitiesBtn(cityToSearch, elem);
  });
}

function wrapCitiesList(citiesList) {
  return _.map(citiesList, (value) => {
    let geonameid = _.get(value, "_links.city:item.href");
    // return only geonameid number from href teleport
    geonameid = _.replace(geonameid, /.*:(\d*).*/, "$1");
    const name = _.get(value, "matching_full_name");
    return {
      geonameid: geonameid,
      name: name,
    };
  });
}

async function setCitiesBtn(cityToSearch, elem) {
  try {
    const citiesList = await teleportApi.searchCity(cityToSearch);

    elem.insertAdjacentHTML(
      "beforeend",
      renderCityList(citiesListID, wrapCitiesList(citiesList))
    );

    const citiesListDiv = document.getElementById(citiesListID);
    citiesListDiv.addEventListener("click", (event) => {
      if (event.target.tagName != "BUTTON") return false;
      // cleaner(citiesListID);
      const cityId = event.target.id;
      setScores(cityId, elem);
    });
  } catch (err) {
    let errorMsg;
    if (err instanceof NoInfoAvailableError) {
      errorMsg = err.message;
    } else {
      errorMsg = `Sorry, we can't search the city due to <b>${err.message}</b>`;
    }
    elem.insertAdjacentHTML("beforeend", renderErr(errorMsgID, errorMsg));
  }
}

function roundScores(scoresCollection) {
  /* Round scores returned by teleportApi.getCityScores method */

  scoresCollection.teleport_city_score = _.round(
    scoresCollection.teleport_city_score,
    2
  );

  _.forEach(scoresCollection.categories, function (value) {
    value.score_out_of_10 = _.round(value.score_out_of_10, 2);
  });

  return scoresCollection;
}

async function setScores(cityid, elem) {
  try {
    const slugName = await teleportApi.getUrbanAreaSlug(cityid);
    let cityScores = await teleportApi.getCityScores(slugName);

    cityScores = roundScores(cityScores);

    elem.insertAdjacentHTML(
      "beforeend",
      renderScoresList(cityScoresID, cityScores)
    );
  } catch (err) {
    let errorMsg;
    if (err instanceof NoInfoAvailableError) {
      errorMsg = `Sorry, we don't have enough info for this city`;
    } else {
      errorMsg = `Sorry, we can't search the city due to internal error: <b>${err.message}</b>`;
    }
    elem.insertAdjacentHTML("beforeend", renderErr(errorMsgID, errorMsg));
  }
}

function cleaner(...elementID) {
  /* utiizzato per ripulire l'ambiente */
  _.forEach(elementID, (id) => {
    // document.getElementById(id)?.remove();
    // doppia ricerca rimuove evento onclick sui pulsanti
    const elem = document.getElementById(id);
    console.log(elem);
    if (elem) {
      elem.style.animation = "fadeout 1s";

      setTimeout(() => {
        elem.remove();
      }, 1000);
    }
  });
}

function renderMain() {
  const main = document.getElementsByTagName("main")[0];
  startPage(main);
}

renderMain();

document.body.querySelector("header a").addEventListener("click", () => {
  document.getElementById(cityInputID).value = "";
  cleaner(citiesListID, cityScoresID, errorMsgID);
});
