import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderScoresList(cityScoresID, scoresList) {
  scoresList = {
    cityScoresID: cityScoresID,
    scoresList: scoresList,
  };
  console.log("in renderedScoreList:", scoresList);

  const rendered = Mustache.render(html, scoresList);

  return rendered;
}

export default renderScoresList;
