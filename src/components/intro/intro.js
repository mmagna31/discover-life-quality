import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderIntroObj(introID) {
  const rendered = Mustache.render(html, {
    introID: introID,
  });

  return parseHtmlById(rendered, introID);
}

export default renderIntroObj;
