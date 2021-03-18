const db = require("../db");

const totalWins = function(userId) {
  return db.query(`SELECT wins as count(winner)
  FROM matches 
  WHERE winner = user_id`,
  [userId]
  ).then(res => res.rows[0].id)
};

exports.totalWins = totalWins;