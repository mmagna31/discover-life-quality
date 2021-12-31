import searchCityApi from "../api/searchCityApi";

function searchInput() {
  // <input class="form-control" list="citiesOptions" id="citiesDataList" placeholder="Type to search...">
  // <label for="citiesDataList" class="form-label">Type city name..</label>
  // <datalist id="citiesOptions">
  //   <option value="San Francisco">
  // </datalist>

  const inputId = "citiesDataList";
  const datalistId = "citiesOptions";

  const searchDomInput = document.createElement("input");
  searchDomInput.className = "form-control";
  searchDomInput.setAttribute("list", datalistId);
  searchDomInput.id = inputId;
  searchDomInput.placeholder = "Type to search...";

  const searchDomLabel = document.createElement("label");
  searchDomLabel.setAttribute("for", inputId);
  searchDomLabel.className = "form-label";
  searchDomLabel.textContent = "Type city name..";

  // TO DO: creare elemento datalist da popolare con promise.
  // aggiungere eventListener per verifica testo inserito (input listener) e popolare datalist

  searchDomInput.addEventListener("input", () =>
    console.log(searchCityApi(searchDomInput.value))
  );

  // searchDomDiv.insertAdjacentHTML(
  //   "afterbegin",
  //   `<input class="form-control" list="citiesOptions" id="citiesDataList" placeholder="Type to search...">
  //   <label for="citiesDataList" class="form-label">Type city name..</label>
  //   <datalist id="citiesOptions">
  //     <option value="San Francisco">
  //   </datalist>`
  // );

  const searchDomDiv = document.createElement("div");
  searchDomDiv.className = "form-floating";
  searchDomDiv.append(searchDomInput, searchDomLabel);

  return searchDomDiv;
}

export default searchInput;
