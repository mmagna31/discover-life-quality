import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderScoresList(scores) {
  console.log("in renderedScoreList:", scores);
  const rendered = Mustache.render(html, scores);

  return rendered;
}

export default renderScoresList;
