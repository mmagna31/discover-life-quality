import "./scss/custom.scss";
var _ = require("lodash");

import teleportApi from "./api/teleportApi";
import renderSeachbar from "./components/searchbar/searchbar";
import renderCityList from "./components/citiesList/citiesList";
import renderScoresList from "./components/scoresList/scoresList";

const searchbarID = "searchbar";
const cityInputID = "cityInp";
const searchCityBtnID = "searchCityBtn";

const citiesList = [
  { geonameid: "12345", name: "roma" },
  { geonameid: "67890", name: "losangeles" },
];

const components = {
  searchbar: renderSeachbar(searchbarID, cityInputID, searchCityBtnID),
  cityList: renderCityList("cityList", citiesList),
};

// -----------     da rivedere perchè main deve essere una funzione async
async function setScore() {
  const scores = await teleportApi.getCityScore("rome");
  components.scores = renderScoresList(scores);
  console.log("in setScore -------------:", typeof components.scores);
  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML("beforeend", components.scores);
}
// setScore();
// -----------------------------

function renderMain() {
  // render components on page index.html
  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML("beforeend", components.searchbar);
  // main.insertAdjacentHTML("beforeend", components.cityList);
}

renderMain();

function addLogic() {
  /* aggiungi listener per gestire logica 
  clicco su pulsante -> prendo valore input -> cerco città -> renderizzo citiesList
  */
  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", async function getCities() {
    // inserire logic scrittura maggiore di 2 o 0 e inserire un modale
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

    const main = document.getElementsByTagName("main")[0];
    main.insertAdjacentHTML(
      "beforeend",
      renderCityList("cityList", citiesList)
    );
  });
}

addLogic();
