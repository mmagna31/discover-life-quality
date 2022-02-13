import "./scss/custom.scss";
var _ = require("lodash");
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import "@popperjs/core";
import * as bootstrap from "bootstrap";

import teleportApi from "./api/teleportApi";
import renderSeachbarObj from "./components/searchbar/searchbar";
import renderCityListObj from "./components/citiesList/citiesList";
import renderScoresListObj from "./components/scoresList/scoresList";
import renderErrObj from "./components/error/errorMessage";
import NoInfoAvailableError from "./noInfoError";
import renderIntroObj from "./components/intro/intro";
import renderNavbarObj from "./components/navbar/navbar";
import renderBckTopObj from "./components/backtotop/backToTopBtn";
import renderFooterObj from "./components/footer/footer";
import wrapCitiesList from "./utils/wrapCitiesList";
import roundScores from "./utils/roundScores";

const searchbarID = "searchbar";
const citiesListID = "citiesList";
const cityScoresID = "scores";
const errorMsgID = "error";
const introID = "introText";
let selectedCity;

/* Start MAIN */
function startPage(elem) {
  const intro = renderIntroObj(introID);
  /* oggetto searchbar */
  const searchbar = renderSeachbarObj(searchbarID);
  /* creo div result per gestione cambio elemento */
  const divResult = document.createElement("div");

  /* trova l'elemento button e assegna listener passando il valore di input */
  _.find(searchbar.children, (child) => {
    if (child.nodeName == "BUTTON") {
      child.addEventListener("click", () => {
        const input = _.find(searchbar.children, (child) => {
          return child.nodeName == "INPUT";
        });

        intro.hidden = true;
        divResult.innerHTML = "";
        setCitiesBtn(input.value, divResult);
      });
    }
  });

  // const inputSearch = document.getElementById(searchbarID).children[0];

  // inputSearch.addEventListener("keyup", function (event) {
  //   // Number 13 is the "Enter" key on the keyboard
  //   if (event.keyCode === 13) {
  //     // Cancel the default action, if needed
  //     event.preventDefault();
  //     // Trigger the button element with a click
  //     document.getElementById(searchbarID).children[1].click();
  //   }
  // });

  elem.append(intro, searchbar, divResult);
}

async function setCitiesBtn(cityToSearch, elem) {
  try {
    const citiesList = await teleportApi.searchCity(cityToSearch);

    const citiesBtnList = renderCityListObj(
      citiesListID,
      wrapCitiesList(citiesList)
    );

    /* aggiungo addEventlistner sfruttando l'event delegation */

    citiesBtnList.addEventListener("click", (event) => {
      if (event.target.tagName != "BUTTON") return false;
      /* rimuovo contenuto divResult */
      elem.innerHTML = "";

      const cityId = event.target.id;
      selectedCity = _.toUpper(event.target.textContent);
      setScores(cityId, _.head(selectedCity.split(",")), elem);
    });
    elem.append(citiesBtnList);
  } catch (err) {
    let errorMsg;
    if (err instanceof NoInfoAvailableError) {
      errorMsg = err.message;
    } else {
      errorMsg = `Sorry, we can't search the city due to internal error: <b>${err.message}</b>`;
    }
    /* rimuovo contenuto divResult */
    elem.innerHTML = "";
    elem.append(renderErrObj(errorMsgID, errorMsg));
  }
}

async function setScores(cityid, selectedCity, elem) {
  try {
    const slugName = await teleportApi.getUrbanAreaSlug(cityid);
    let cityScores = await teleportApi.getCityScores(slugName);

    cityScores = roundScores(cityScores);

    // adding cityname
    cityScores["cityName"] = selectedCity;

    /* rimuovo contenuto divResult */
    elem.innerHTML = "";
    elem.append(renderScoresListObj(cityScoresID, cityScores));
  } catch (err) {
    let errorMsg;
    if (err instanceof NoInfoAvailableError) {
      errorMsg = `Sorry, we don't have enough info for this city. <b>Try looking for another city</b>.`;
    } else {
      errorMsg = `Sorry, we can't search the city due to internal error: <b>${err.message}</b>`;
    }
    /* rimuovo contenuto divResult */
    elem.innerHTML = "";
    elem.append(renderErrObj(errorMsgID, errorMsg));
  }
}

function renderMain() {
  // const main = document.createElement("main");
  const main = _.head(document.getElementsByTagName("main"));
  console.log(main);
  startPage(main);
}
/* End MAIN */

/* Start HEADER */

function renderHeader() {
  /* SISTEMARE */
  const header = _.head(document.getElementsByTagName("header"));
  const navbar = renderNavbarObj();

  header.append(navbar);
  /* aggiungo popover */
  let popover = new bootstrap.Popover(document.getElementById("info"), {
    container: "body",
  });

  /* aggiunge evento per nascondere il popover */
  document.body.addEventListener("click", (event) => {
    if (!event.target.closest('[data-bs-toggle="popover"]')) popover.hide();
  });
}
/* End HEADER */

/* start FOOTER */
function renderFooter() {
  document.body.append(renderFooterObj());
}
/* End FOOTER */

/* Start Back to top element */

function renderBackToTop() {
  const bckTopID = "backToTop";
  /* back to top button */
  const bckTopBtn = renderBckTopObj(bckTopID);
  const btn = _.head(bckTopBtn.children);

  btn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  window.addEventListener("scroll", () => {
    const bckTop = document.getElementById("backToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      bckTop.hidden = false;
    } else {
      bckTop.hidden = true;
    }
  });

  document.body.append(bckTopBtn);
}

/* End Back to top element */

renderMain();
renderHeader();
renderFooter();
renderBackToTop();

/* assegno evento per gestione enter sull'elemento input */
/* DA RIVEDERE */
const inputSearch = document.getElementById(searchbarID).children[0];

inputSearch.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById(searchbarID).children[1].click();
  }
});
