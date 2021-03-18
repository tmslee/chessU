const router = require("express").Router();
const {
  getChatLogsByMatch,
  addChatLog
} = require("../db_helpers/db_chatLog_helpers");

module.exports = db => {
  router.get('/chatLogs/:matchID', (req, res) => {
    const matchID = req.params.matchID;

    getChatLogsByMatch(matchID)
    .then ( logs => {
      res.json(logs);
    })
    .catch( err => {
      res.send(err);
    });
  });

  router.post('/chatLogs', (req, res) => {
    const { userID, matchID, message } = req.body;

    addChatLog(userID, matchID, message)
    .then( log => {
      res.json(log);
    })
    .catch( err => {
      res.send(err);
    });
  });
  
  return router;
}