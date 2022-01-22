import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderCityList(citiesListID, citiesListObj) {
  /* citiesListObj must be an array of cities
      cities: [
      { geoid: "12345", name: "roma" },
      { geoid: "67890", name: "losangeles" },
    ],
   */

  const rendered = Mustache.render(html, {
    citiesListID: citiesListID,
    cities: citiesListObj,
  });

  return rendered;
}

export default renderCityList;
