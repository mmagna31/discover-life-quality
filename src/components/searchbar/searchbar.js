import Mustache, { render } from "mustache";
import parseHtmlById from "../../utils/parseHtml";
import template from "./template.html";

function renderSeachbarObj(searchbarId) {
  /* return searchbar as DOM object */
  const rendered = Mustache.render(template, {
    searchbarId: searchbarId,
  });

  return parseHtmlById(searchbarId, rendered);
}

export default renderSeachbarObj;
