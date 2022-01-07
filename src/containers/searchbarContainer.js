import searchButton from "../components/searchbar/searchButton.js";
import searchInput from "../components/searchbar/searchInput.js";

function searchbar() {
  const inputId = "searchInput";
  const datalistId = "datalistCities";
  const buttonId = "searchButton";

  const input = searchInput(inputId, datalistId);
  const button = searchButton(buttonId, "Search");
}
