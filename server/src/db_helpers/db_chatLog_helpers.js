const db = require("../db");

const getChatLogsByMatch = function(matchID) {
  return db.query( `
  SELECT * 
  FROM chat_logs
  WHERE match_id = $1;`,
  [matchID]
  ).then(res => res.rows)
};

exports.getChatLogsByMatch = getChatLogsByMatch;

const addChatLog = function(userID, matchID, message) {
  return db.query(`
  INSERT INTO chat_logs 
  (user_id, match_id, message) 
  VALUES ($1, $2, $3) 
  RETURNING *;`,
  [userID, matchID, message]
  ).then(res => res.rows)
};

exports.addChatLog = addChatLog;