import _ from "lodash";
import searchCityApi from "../api/searchCityApi";

let inputLastChangeTime = _.now();
let timerId;
let count = 0;

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
  const searchDomForm = document.createElement("form");
  searchDomForm.className = "d-flex form-floating";
  searchDomForm.append(searchDomInput, searchDomLabel, searchDomDatalist);

  // INPUT LISTENER
  searchDomInput.addEventListener("input", () => {
    async function run() {
      console.log("eseguo chiamata");
      const citiesList = await searchCityApi(searchDomInput.value);

      // svuota datalist option
      searchDomDatalist.innerHTML = "";

      // DATALIST OPTION
      _.forEach(citiesList, (value) => {
        // const datalistOption = document.createElement("option");
        // datalistOption.setAttribute("value", _.get(value, "fullname"));
        const datalistOption = new Option(_.get(value, "fullname"));
        searchDomDatalist.append(datalistOption);
      });
    }

    searchDomInput.addEventListener("change", () => {
      count += 1;
      console.log(count, "evento onChange");
    });

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

  // return form
  return searchDomForm;
}

export default searchInput;
