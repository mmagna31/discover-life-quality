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
const cityScoresID = "scores"; // da cambiare nel template

// const components = {
//   searchbar: ,
//   // cityList: renderCityList("cityList", citiesList),
// };

function renderMain() {
  // render components on page index.html
  const main = document.getElementsByTagName("main")[0];
  main.insertAdjacentHTML(
    "beforeend",
    renderSeachbar(searchbarID, cityInputID, searchCityBtnID)
  );

  const searchBtnElement = document.getElementById(searchCityBtnID);
  searchBtnElement.addEventListener("click", async function getCities() {
    // inserire logic scrittura maggiore di 2 o 0 e inserire un modale
    // tasto enter non funziona in search
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

    // rimuovere button list e scores list prima di un'altra ricerca
    let citiesListDiv = document.getElementById(citiesListID);
    let cityScoreDiv = document.getElementById(cityScoresID);

    if (citiesListDiv) {
      citiesListDiv.remove();
    }

    if (cityScoreDiv) {
      cityScoreDiv.remove();
    }

    main.insertAdjacentHTML(
      "beforeend",
      renderCityList(citiesListID, citiesList)
    );

    // assegna evento onclick a citiesList
    // recall citiesList to update citiesList
    citiesListDiv = document.getElementById(citiesListID);
    citiesListDiv.addEventListener("click", async (event) => {
      try {
        if (event.target.tagName != "BUTTON") return false;

        const slugName = await teleportApi.getUrbanAreaSlugName(
          event.target.id
        );
        console.log("slugname:", typeof slugName);

        const cityScores = await teleportApi.getCityScore(slugName);

        citiesListDiv.remove();
        main.insertAdjacentHTML("beforeend", renderScoresList(cityScores));
        // TO DO: inserire messaggio per scores non disponibili...in caso far vedere altre informazioni
        // inserire funzionne di puiza della pagina per gli elementi scores button e error message
      } catch (err) {
        console.log(err.message);
        citiesListDiv.remove();
        // oppure modale
        main.insertAdjacentHTML(
          "beforeend",
          "<h1>Siamo spiacenti! non abbiamo informazioni a sufficienza per questa città</h1>"
        );
      }
    });
  });
}

renderMain();
