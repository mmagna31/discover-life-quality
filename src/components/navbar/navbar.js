import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderNavbarObj(navbarID = "navbar") {
  const rendered = Mustache.render(html, {
    navbarID: navbarID,
  });

  return parseHtmlById(rendered, navbarID);
}

export default renderNavbarObj;
