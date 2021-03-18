const db = require("../db");

const getActionsByMatch = function(matchID) {
  return db.query(`
  SELECT * 
  FROM action_logs
  WHERE match_id = $1;`,
  [matchID]
  ).then(res => res.rows)
};

exports.getActionsByMatch = getActionsByMatch;

const addAction = function(userID, matchID, action) {
  return db.query(`
  INSERT INTO 
  action_logs (user_id, match_id, action) 
  VALUES ($1, $2, $3) 
  RETURNING * ;`,
  [userID, matchID, action]
  ).then(res => res.rows[0])
};

exports.addAction = addAction;