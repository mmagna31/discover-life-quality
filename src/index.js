import searchbar from "./containers/searchbarContainer.js";
import "./scss/custom.scss";
var _ = require("lodash");

document.body.append(searchbar("searchContainer"));

//TESTING
// import teleportApi from "./api/teleportApi";

// const tmp = async () =>
//   console.log("SCORES: ", await teleportApi.getCityScore("rom"));

// tmp();

// const tmp2 = async () =>
//   console.log("cityname: ", await teleportApi.getCityName(3169070));

// tmp2();

// const tmp3 = async () => {
//   const cityList = await teleportApi.searchCity("roma");
//   console.log("searchCity: ", cityList);
// };

// tmp3();
