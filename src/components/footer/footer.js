import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderFooterObj(footerID = "ftr") {
  const rendered = Mustache.render(html, {
    footerID: footerID,
  });

  return parseHtmlById(rendered, footerID);
}

export default renderFooterObj;
