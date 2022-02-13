import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderBckTopObj(backToTopID = "bckTop") {
  const rendered = Mustache.render(html, {
    backToTopID: backToTopID,
  });

  return parseHtmlById(rendered, backToTopID);
}

export default renderBckTopObj;
