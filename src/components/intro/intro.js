import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderIntroObj(introID) {
  const text = "Discover the quality of life for your favorite city";
  const rendered = Mustache.render(html, {
    introID: introID,
    text: text,
  });

  return parseHtmlById(rendered, introID);
}

export default renderIntroObj;
