import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderCityList(citiesListID, citiesListObj) {
  /* citiesListObj must be an array of cities
      cities: [
      { geonameid: "12345", name: "roma" },
      { geonameid: "67890", name: "losangeles" },
    ],
   */

  const rendered = Mustache.render(html, {
    citiesListID: citiesListID,
    cities: citiesListObj,
  });

  return rendered;
}

export default renderCityList;
