const router = require("express").Router();
const {
  allMatches,
  addMatch,
  getMatchById,
  updateMatch
} = require("../db_helpers/db_match_helpers");

const {
  getEloWithUseId30,
  getEloWithUseId10,
  getEloWithUseIdCausl
} = require("../db_helpers/db_elo_helper");

const eloUpdate = require("../helpers/elo_update_helper");

module.exports = db => {
  router.get('/matches', (req, res) => {
    allMatches()
    .then( matches => {
      res.json(matches);
    })
    .catch( err => {
      res.send(err);
    });
  });

  router.post('/matches', (req, res) => {
    const {type, user1ID, user2ID} = req.body;
    addMatch(type, user1ID, user2ID)
    .then( match => {
      res.json(match);
    })
    .catch( err => {
      res.send(err);
    });
  });

  router.get('/matches/:matchID', (req, res) => {
    const matchID = req.params.matchID;

    getMatchById(matchID)
    .then( match => {
      res.json(match);
    })
    .catch( err => {
      res.send(err);
    });
  });

  router.put('/matches/:matchID', async (req, res) => {
    const {white, black, winner, loser, timeLimit} = req.body;
    const matchID = req.params.matchID;

    // update the match result in db
    const updatedMatch = await updateMatch(white, black, winner, loser, matchID)
    console.log(updatedMatch[0].type);
    
    // get the elos for winner and loser from db
    if (updatedMatch[0].type === 'RANKED' && timeLimit === 30){
      const eloWinner = await getEloWithUseId30(winner);
      const eloLoser = await getEloWithUseId30(loser);
      console.log('winner id', winner, 'winner elo', eloWinner, 'loser id', loser, 'loser elo', eloLoser);
    }

    // calculate the updated elos and update them in db
    eloUpdate(winner, eloWinner, loser, eloLoser, updatedMatch[0].type, timeLimit);
  });

  return router;
};