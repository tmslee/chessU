const router = require("express").Router();
const {
  getActionsByMatch,
  addAction
} = require("../db_helpers/db_action_helpers");

module.exports = db => {
  router.get('/actions/:matchID', (req, res) => {
    const matchID = req.params.matchID;

    getActionsByMatch(matchID)
    .then( logs => {
      res.json(logs);
    })
    .catch( err => {
      res.send(err);
    });
  });

  router.post('/actions', (req, res) => {
    const { userID, matchID, action } = req.body

    addAction(userID, matchID, action)
    .then( action => {
      res.json(action);
    })
    .catch( err => {
      res.send(err);
    });
  });

  return router;
}