import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderNavbarObj(navbarID = "navbar", btnInfoID = "info") {
  const rendered = Mustache.render(html, {
    navbarID: navbarID,
    btnInfoID: btnInfoID,
  });

  return parseHtmlById(rendered, navbarID);
}

export default renderNavbarObj;
