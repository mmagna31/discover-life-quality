import _ from "lodash";
import teleportApi from "../api/teleportApi.js";
import searchButton from "../components/searchbar/searchButton.js";
import searchInput from "../components/searchbar/searchInput.js";
import parseHtmlById from "../utils/parseHtml.js";
import scoresContainer from "./scoresContainer.js";

async function setDatalist(inputId, datalistId) {
  try {
    const input = document.getElementById(inputId);
    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = "";

    console.log("in setDatalist function: eseguo chiamata searchCity");

    const citiesList = await teleportApi.searchCity(input.value);

    // create datalist option
    _.forEach(citiesList, (value) => {
      const fullname = _.get(value, "matching_full_name");
      const cityUrl = _.get(value, "_links.city:item.href");
      const cityId = _.replace(cityUrl, /.*:(\d*).*/, "$1");
      const datalistOption = new Option(fullname);
      datalistOption.dataset.cityId = cityId;
      datalist.append(datalistOption);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function searchbar(id) {
  const html = `<div id="${id}"></div>`;

  const inputId = "searchInputId";
  const datalistId = "datalistCitiesId";
  const buttonId = "searchButtonId";

  const input = searchInput("searchbarId", inputId, datalistId);

  input.addEventListener("input", (event) => {
    // da rivedere per una gestione migliore
    const timeoutInput = 1000; // ms

    if (event.target.value.length < 1) return false;

    // assegno 2 proprietà all'oggetto input per gestione scheduling prossimo input
    input.lastChange = _.now();
    input.timerId = setTimeout(function checkInputChange() {
      if (_.now() - input.lastChange <= timeoutInput) {
        clearTimeout(input.timerId);
        input.timerId = setTimeout(checkInputChange, timeoutInput);
        return false;
      }

      setDatalist(inputId, datalistId);
    }, timeoutInput);
  });

  input.addEventListener("change", (event) => {
    const datalist = document.getElementById(datalistId);
    const btn = document.getElementById(buttonId);

    // trovare altro metodo migliore per ricerca valore in option

    if (
      _.find(datalist.children, function (opt) {
        return opt.value == event.target.value;
      })
    ) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });

  const button = searchButton(buttonId, "Search");
  button.addEventListener("click", async () => {
    const inputValue = document.getElementById(inputId).value;

    //cercare id of input value in datalist
    const datalist = document.getElementById(datalistId);

    // ritorna il primo elemento che contiene input.value
    const opt = _.find(datalist.children, (optElement) => {
      return optElement.text == inputValue;
    });

    const cityId = opt.dataset.cityId;
    let cityName = await teleportApi.getCityName(cityId);
    cityName = _.kebabCase(cityName);

    const scores = await teleportApi.getCityScore(cityName);
    console.log("SCORES:", scores);
    document.body.append(scoresContainer(scores));
  });

  const div = parseHtmlById(html, id);
  div.append(input, button);

  return div;
}

export default searchbar;
