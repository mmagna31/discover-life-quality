import Mustache, { render } from "mustache";
import parseHtmlById from "../../utils/parseHtml";
import html from "./template.html";

function renderSeachbarObj(searchbarId) {
  /* return searchbar as DOM object */
  const rendered = Mustache.render(html, {
    searchbarId: searchbarId,
  });

  return parseHtmlById(rendered, searchbarId);
}

export default renderSeachbarObj;
