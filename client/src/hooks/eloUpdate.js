const eloUpdate = function(winnerName, winner_elo, loserName, loser_elo){

  const eloDifference = 400;
  const transformedRatingWinner = Math.pow(10, winner_elo / eloDifference);
  const transformedRatingLoser = Math.pow(10, loser_elo / eloDifference);

  // Onto the expected score for each player
  const expectedScoreWinner = transformedRatingWinner / (transformedRatingWinner + transformedRatingLoser);
  const expectedScoreLoser = transformedRatingLoser / (transformedRatingWinner + transformedRatingLoser);

  // K = 32 and get the updated elo rating
  const updatedWinner = Math.round(winner_elo + 32 * (1 - expectedScoreWinner));
  const updatedLoser = Math.round(loser_elo + 32 * (0 - expectedScoreLoser));

  return {winnerName, winner_elo, updatedWinner, loserName, winner_elo, updatedLoser};
}

exports.eloUpdate = eloUpdate;