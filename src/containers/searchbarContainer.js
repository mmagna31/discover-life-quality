import searchButton from "../components/searchbar/searchButton.js";
import searchInput from "../components/searchbar/searchInput.js";
import parseHtmlById from "../utils/parseHtml.js";

function searchbar(id) {
  const html = `<div id="${id}"></div>`;
  /* inserisce logica ai componenti */
  const inputId = "searchInput";
  const datalistId = "datalistCities";
  const buttonId = "searchButton";

  const input = searchInput("searchbar", inputId, datalistId);
  const button = searchButton(buttonId, "Search");

  const div = parseHtmlById(html, id);
  console.log("div", div);
  div.append(input, button);

  return div;

  // const div = document.createElement("div");
  // // div.className = "d-flex";
  // div.append(input, button);
  // return div;
}

export default searchbar;
