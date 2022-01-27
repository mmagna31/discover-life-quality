import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderScoresList(cityScoresID, scoresList) {
  const rendered = Mustache.render(html, {
    cityScoresID: cityScoresID,
    scoresList: scoresList,
  });

  return rendered;
}

export default renderScoresList;
