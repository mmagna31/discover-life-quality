import teleportApi from "../api/teleportApi.js";
import searchButton from "../components/searchbar/searchButton.js";
import searchInput from "../components/searchbar/searchInput.js";
import parseHtmlById from "../utils/parseHtml.js";

async function setDatalist(inputId, datalistId) {
  try {
    const input = document.getElementById(inputId);
    const datalist = document.getElementById(datalistId);
    datalist.innerHTML = "";

    console.log("in setDatalist function: eseguo chiamata searchCity");

    const citiesList = await teleportApi.searchCity(
      _.replace(input.value, /\(.*\)/, "")
    );

    // create datalist option
    _.forEach(citiesList, (value) => {
      // fai pulizia dell'output della chiamata: elimina (roma)
      const fullname = _.get(value, "fullname");
      const datalistOption = new Option(fullname);
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
  button.addEventListener("click", () => {
    const inputValue = document.getElementById(inputId);
    console.log(_.kebabCase(_.lowerCase(_.split(inputValue.value, ",", 1))));
    // console.log(teleportApi.getCityScore("rome"));
  });

  const div = parseHtmlById(html, id);
  div.append(input, button);

  return div;
}

export default searchbar;
