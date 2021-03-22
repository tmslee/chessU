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
  getEloWithUseIdCasual
} = require("../db_helpers/db_elo_helper");

const { eloUpdate } = require("../helpers/elo_update_helper");


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
    
    // get the elos for winner and loser from db
    if (updatedMatch[0].type === 'RANKED' && timeLimit == 30){
      const eloWinner = await getEloWithUseId30(winner);
      const eloLoser = await getEloWithUseId30(loser);
      // calculate the updated elos and update them in db
      eloUpdate(winner, eloWinner.ranked30, loser, eloLoser.ranked30, updatedMatch[0].type, Number(timeLimit));
    }

    if (updatedMatch[0].type === 'RANKED' && timeLimit == 10){
      const eloWinner = await getEloWithUseId10(winner);
      const eloLoser = await getEloWithUseId10(loser);
      // calculate the updated elos and update them in db
      eloUpdate(winner, eloWinner.ranked10, loser, eloLoser.ranked10, updatedMatch[0].type, Number(timeLimit));
    }

    if (updatedMatch[0].type === 'CASUAL'){
      const eloWinner = await getEloWithUseIdCasual(winner);
      const eloLoser = await getEloWithUseIdCasual(loser);
      // calculate the updated elos and update them in db
      eloUpdate(winner, eloWinner.casual, loser, eloLoser.casual, updatedMatch[0].type, Number(timeLimit));
    }
  });

  return router;
};