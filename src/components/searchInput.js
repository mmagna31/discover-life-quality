import _ from "lodash";
import searchCityApi from "../api/searchCityApi";

/*
        <form class="d-flex">
            <input class="form-control me-2" type="search" list="datalistOptions" placeholder="Search"
                aria-label="Search">
            <datalist id="datalistOptions">
                <option value="San Francisco">
                <option value="New York">
                <option value="Seattle">
                <option value="Los Angeles">
                <option value="Chicago">
            </datalist>
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
*/

let inputLastChangeTime = _.now();
let timerId;

function searchInput() {
  const inputTimeout = 3000;

  const inputId = "cityInput";
  const datalistId = "datalistCities";

  // INPUT
  const searchDomInput = document.createElement("input");
  searchDomInput.id = inputId;
  searchDomInput.className = "form-control me-2";
  searchDomInput.setAttribute("type", "search");
  searchDomInput.setAttribute("list", datalistId);
  searchDomInput.setAttribute("aria-label", "Search");
  searchDomInput.placeholder = "Search";

  // LABEL
  const searchDomLabel = document.createElement("label");
  searchDomLabel.setAttribute("for", inputId);
  searchDomLabel.className = "form-label";
  searchDomLabel.textContent = "City";

  // DATALIST
  const searchDomDatalist = document.createElement("datalist");
  searchDomDatalist.id = datalistId;

  // FORM
  const searchDomDiv = document.createElement("form");
  searchDomDiv.className = "d-flex form-floating";
  searchDomDiv.append(searchDomInput, searchDomLabel, searchDomDatalist);

  // INPUT LISTENER
  searchDomInput.addEventListener("input", () => {
    async function run() {
      console.log("eseguo chiamata");
      const citiesList = await searchCityApi(searchDomInput.value);

      // svuota datalist option
      searchDomDatalist.innerHTML = "";

      // DATALIST OPTION
      _.forEach(citiesList, (value) => {
        const datalistOption = document.createElement("option");
        datalistOption.setAttribute("value", _.get(value, "fullname"));
        searchDomDatalist.append(datalistOption);
      });
    }

    // check se deve chiamare api
    let inputChangeTime = _.now();
    if (searchDomInput.value.length >= 1) {
      if (inputChangeTime - inputLastChangeTime <= inputTimeout) {
        timerId = setTimeout(run, inputTimeout);
      } else {
        clearTimeout(timerId);
        timerId = setTimeout(run, inputTimeout);
      }
    } else {
      // quando si elimina tutto il contenuto di input occorre svuotare datalist
      searchDomDatalist.innerHTML = "";
    }
  });

  return searchDomDiv;
}

export default searchInput;
