import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderCityListObj(citiesListID, citiesListObj) {
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

  return parseHtmlById(rendered, citiesListID);
}

export default renderCityListObj;
