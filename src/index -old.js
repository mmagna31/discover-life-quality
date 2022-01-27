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

function cleaner(...elementID) {
  /* utiizzato per ripulire l'ambiente */
  _.forEach(elementID, (id) => {
    console.log(document.getElementById(id));
    document.getElementById(id)?.remove();
  });
}

function renderMain() {
  // render components on page index.html
  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML(
    "beforeend",
    renderSeachbar(searchbarID, cityInputID, searchCityBtnID)
  );

  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", async function getCities() {
    const cityToSearch = document.getElementById(cityInputID).value;
    let citiesList = await teleportApi.searchCity(cityToSearch);

    // ----------------------------renderizzo elenco città
    // trasform citiesList in array
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

    main.insertAdjacentHTML(
      "beforeend",
      renderCityList(citiesListID, citiesList)
    );

    // assegna evento onclick a citiesList
    // recall citiesList to update citiesList
    const citiesListDiv = document.getElementById(citiesListID);
    citiesListDiv.addEventListener("click", async (event) => {
      try {
        if (event.target.tagName != "BUTTON") return false;

        const slugName = await teleportApi.getUrbanAreaSlugName(
          event.target.id
        );

        const cityScores = await teleportApi.getCityScores(slugName);
        console.log("call getCityScores:", JSON.stringify(cityScores));

        main.insertAdjacentHTML(
          "beforeend",
          renderScoresList(cityScoresID, cityScores)
        );
      } catch (err) {
        console.log(err.message);
        cleaner(citiesListDiv);
        main.insertAdjacentHTML(
          "beforeend",
          "<h1>Siamo spiacenti! non abbiamo informazioni a sufficienza per questa città</h1>"
        );
      }
    });
  });
}

renderMain();
