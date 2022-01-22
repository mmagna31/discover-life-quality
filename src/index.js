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

// -----------     da rivedere
async function setScore() {
  const scores = await teleportApi.getCityScore("rome");
  components.scores = renderScoresList(scores);
  console.log("in setScore -------------:", typeof components.scores);
  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML("beforeend", components.scores);
}
setScore();
// -----------------------------

function renderMain() {
  // render components on page index.html
  console.log("in main:-----------------", components.scores);

  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML("beforeend", components.searchbar);
  main.insertAdjacentHTML("beforeend", components.cityList);
}

renderMain();

function addLogic() {
  /* aggiungi listener per gestire logica */
  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", () => {
    const city = document.getElementById(cityInputID).value;

    alert(city);
  });
}

addLogic();
