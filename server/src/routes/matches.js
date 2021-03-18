const router = require("express").Router();
const {
  allMatches,
  addMatch,
  getMatchById,
  updateMatch
} = require("../db_helpers/db_match_helpers");

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

  router.put('/matches/:matchID', (req, res) => {
    const {white, black, winner, loser} = req.body;
    const matchID = req.params.matchID;

    updateMatch(white, black, winner, loser, matchID)
    .then( match => {
      res.json(match);
    })
    .catch( err => {
      res.send(err);
    });
  });

  return router;
};