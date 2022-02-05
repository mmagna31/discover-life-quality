var _ = require("lodash");
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all";
import "./scss/custom.scss";
import renderSeachbarObj from "./components/searchbar/searchbar";

const searchbarID = "searchbar";

function renderMain() {
  const main = document.getElementsByTagName("main")[0];

  const searchbar = renderSeachbarObj(searchbarID);
  main.append(searchbar);
}

renderMain();
