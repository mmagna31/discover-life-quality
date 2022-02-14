import "./assets/scss/custom.scss";
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
import renderIntroObj from "./components/intro/intro";
import renderNavbarObj from "./components/navbar/navbar";
import renderBckTopObj from "./components/backtotop/backToTopBtn";
import renderFooterObj from "./components/footer/footer";
import NoInfoAvailableError from "./utils/noInfoError";
import roundScores from "./utils/roundScores";
import searchbarEnterHandler from "./utils/enterKeyHandler";
import wrapCitiesList from "./utils/wrapCitiesList";

const searchbarID = "searchbar";
const citiesListID = "citiesList";
const cityScoresID = "scores";
const errorMsgID = "error";
const introID = "introText";
const navbarID = "navbar";
const btnInfoID = "info";
let selectedCity;

/* Start MAIN */

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
  const main = document.createElement("main");

  const intro = renderIntroObj(introID);
  /* oggetto searchbar */
  const searchbar = renderSeachbarObj(searchbarID);
  const input = searchbar.children[0];
  const searchBtn = searchbar.children[1];
  /* Adding event to manage enter key on searchbar */
  searchbarEnterHandler(input, searchBtn);
  /* Div element to manage citiesList and scoreList elements */
  const divResult = document.createElement("div");

  searchBtn.addEventListener("click", () => {
    intro.hidden = true;
    divResult.innerHTML = "";
    setCitiesBtn(input.value, divResult);
  });

  main.append(intro, searchbar, divResult);

  return main;
}
/* End MAIN */

/* Start HEADER */

function renderHeader() {
  /* SISTEMARE */
  // const header = _.head(document.getElementsByTagName("header"));
  const header = document.createElement("header");
  const navbar = renderNavbarObj(navbarID, btnInfoID);

  header.append(navbar);

  /* DA RIVEDERE */
  const infoBtn = _.find(navbar.children[0].children, (child) => {
    return child.nodeName == "BUTTON";
  });

  /* aggiungo popover */
  let popover = new bootstrap.Popover(infoBtn, {
    container: "body",
  });

  /* aggiunge evento per nascondere il popover */
  document.body.addEventListener("click", (event) => {
    if (!event.target.closest('[data-bs-toggle="popover"]')) popover.hide();
  });

  return header;
}
/* End HEADER */

/* start FOOTER */
function renderFooter() {
  return renderFooterObj();
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

  return bckTopBtn;
}

/* End Back to top element */

/* Setting body */
document.body.append(
  renderHeader(),
  renderMain(),
  renderFooter(),
  renderBackToTop()
);
