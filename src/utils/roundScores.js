/* Round scores returned by teleportApi.getCityScores method */
function roundScores(scoresCollection) {
  scoresCollection.teleport_city_score = _.round(
    scoresCollection.teleport_city_score,
    2
  );

  _.forEach(scoresCollection.categories, function (value) {
    value.score_out_of_10 = _.round(value.score_out_of_10, 2);
  });

  return scoresCollection;
}

export default roundScores;
