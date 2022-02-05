import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderScoresListObj(cityScoresID, scoresList) {
  const rendered = Mustache.render(html, {
    cityScoresID: cityScoresID,
    scoresList: scoresList,
  });

  return parseHtmlById(rendered, cityScoresID);
}

export default renderScoresListObj;
