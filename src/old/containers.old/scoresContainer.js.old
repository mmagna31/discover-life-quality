import scoreDiv from "../components/scores/score.js";

function scoresContainer(id, jsonObj) {
  const html = `<div id="${id}"></div>`;
  const summary = _.get(jsonObj, "summary");
  const totalScore = _.get(jsonObj, "teleport_city_score");
  const categories = _.get(jsonObj, "categories");

  const summaryDiv = scoreDiv("summaryId", "Summary", summary, "white");
  const totalScoreDiv = scoreDiv(
    "totalScoreId",
    "Total Score",
    totalScore,
    "blue"
  );

  // definisce gli elementi per gli scores
  const div = parseHtmlById(html, id);
  div.append(summaryDiv, totalScoreDiv);
  return div;
}

export default scoresContainer;
