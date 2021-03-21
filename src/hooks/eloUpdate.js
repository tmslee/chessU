const eloUpdate = async function(winnerId, winner_elo, loserId, loser_elo, type, timeLimit){
  console.log('elo update function', winnerId, winner_elo, loserId, loser_elo, type, timeLimit)

  const eloDifference = 400;
  const transformedRatingWinner = Math.pow(10, winner_elo / eloDifference);
  const transformedRatingLoser = Math.pow(10, loser_elo / eloDifference);

  // Onto the expected score for each player
  const expectedScoreWinner = transformedRatingWinner / (transformedRatingWinner + transformedRatingLoser);
  const expectedScoreLoser = transformedRatingLoser / (transformedRatingWinner + transformedRatingLoser);

  // K = 32 and get the updated elo rating
  const updatedWinner = Math.round(winner_elo + 32 * (1 - expectedScoreWinner));
  const updatedLoser = Math.round(loser_elo + 32 * (0 - expectedScoreLoser));
  console.log(updatedWinner, updatedLoser);

}

exports.eloUpdate = eloUpdate;