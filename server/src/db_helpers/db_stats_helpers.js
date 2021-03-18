const db = require("../db");

const totalWins = function(userId) {
  return db.query(`
  SELECT wins as count(winner)
  FROM matches 
  WHERE winner = $1`,
  [userId]
  ).then(res => res.rows[0])
};

exports.totalWins = totalWins;

const totalLosses = function(userId) {
  return db.query(`
  SELECT losses as count(loser)
  FROM matches 
  WHERE loser = $1`,
  [userId]
  ).then(res => res.rows[0])
};

exports.totalLosses = totalLosses;

const totalMatches = function(userId) {
  return db.query(`
  SELECT count(id) 
  FROM matches
  WHERE user1_id = $1 OR user2_id = $1 `,
  [userId]
  ).then(res => res.rows[0])
};

exports.totalMatches = totalMatches;

const totalActions = function(userId) {
  return db.query(`
  SELECT count(id) FROM action_logs 
  WHERE user_id = $1;`,
  [userId]
  ).then(res => res.rows[0])
};

exports.totalActions = totalActions;

const winsAsWhite = function(userId) {
  return db.query(`
  SELECT COUNT(*) AS win_white
  FROM matches 
  WHERE winner = $1 AND white = $1;
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.winsAsWhite = winsAsWhite;

const winsAsBlack = function(userId) {
  return db.query(`
  SELECT COUNT(*) AS win_black
  FROM matches
  WHERE winner = $1 AND black = $1;
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.winsAsBlack = winsAsBlack;

const avgMatchLength = function(userId) {
  return db.query(`
  SELECT AVG(end_time-start_time) AS avg_match_len
  FROM matches
  WHERE user1_id = $1 OR user2_id = $1;
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.avgMatchLength = avgMatchLength;