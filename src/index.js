import "./scss/custom.scss";
var _ = require("lodash");

import teleportApi from "./api/teleportApi";
import renderSeachbar from "./components/searchbar/searchbar";
import renderCityList from "./components/citiesList/citiesList";
import renderScoresList from "./components/scoresList/scoresList";

const searchbarID = "searchbar";
const cityInputID = "cityInp";
const searchCityBtnID = "searchCityBtn";
const citiesListID = "citiesList";
const cityScoresID = "scores";

function startPage(elem) {
  elem.insertAdjacentHTML(
    "beforeend",
    renderSeachbar(searchbarID, cityInputID, searchCityBtnID)
  );

  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", () => {
    // inserire div di errore
    cleaner(citiesListID, cityScoresID);
    // get input.value
    const cityToSearch = document.getElementById(cityInputID).value;
    setCitiesBtn(cityToSearch, elem);
  });
}

async function getCitiesList(cityToSearch) {
  let citiesList = await teleportApi.searchCity(cityToSearch);

  citiesList = _.map(citiesList, (value) => {
    let geonameid = _.get(value, "_links.city:item.href");
    // return only geonameid number from href teleport
    geonameid = _.replace(geonameid, /.*:(\d*).*/, "$1");
    const name = _.get(value, "matching_full_name");
    return {
      geonameid: geonameid,
      name: name,
    };
  });

  return citiesList;
}

async function setCitiesBtn(cityToSearch, elem) {
  const citiesList = await getCitiesList(cityToSearch);

  elem.insertAdjacentHTML(
    "beforeend",
    renderCityList(citiesListID, citiesList)
  );

  const citiesListDiv = document.getElementById(citiesListID);
  citiesListDiv.addEventListener("click", (event) => {
    if (event.target.tagName != "BUTTON") return false;
    cleaner(citiesListID);
    setScores(event.target.id, elem);
  });
}

async function setScores(cityid, elem) {
  try {
    const slugName = await teleportApi.getUrbanAreaSlugName(cityid);

    const cityScores = await teleportApi.getCityScores(slugName);

    elem.insertAdjacentHTML(
      "beforeend",
      renderScoresList(cityScoresID, cityScores)
    );
  } catch (err) {
    console.log(err.message);
    elem.insertAdjacentHTML(
      "beforeend",
      "<h1>Siamo spiacenti! non abbiamo informazioni a sufficienza per questa città</h1>"
    );
  }
}

function cleaner(...elementID) {
  /* utiizzato per ripulire l'ambiente */
  _.forEach(elementID, (id) => {
    console.log(document.getElementById(id));
    document.getElementById(id)?.remove();
  });
}

function renderMain() {
  const main = document.getElementsByTagName("main")[0];
  startPage(main);
}

renderMain();
