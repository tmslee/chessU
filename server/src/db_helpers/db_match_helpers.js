const db = require("../db");

const addMatch = function(type, user1, user2) {
  return db.query(`
  INSERT INTO matches 
  (type, user1_id, user2_id) 
  VALUES ($1::text, $2::integer, $3::integer) 
  RETURNING *;`,
  [type, user1, user2]
  ).then(res => res.rows[0])
};

exports.addMatch = addMatch;

const allMatches = function() {
  return db.query(`
  SELECT * 
  FROM matches;`
  ).then(res => res.rows)
};

exports.allMatches = allMatches;

const getMatchById = function(id) {
  return db.query(`
  SELECT * 
  FROM matches 
  where id = $1;`,
  [id]
  ).then(res => res.rows)
};

exports.getMatchById = getMatchById;

const updateMatch = function(white, black, winner, loser, matchID) {
  return db.query(`
  UPDATE matches SET
    white = $1::integer,
    black = $2::integer,
    winner = $3::integer,
    loser = $4::integer
  WHERE id = $5::integer
  RETURNING *;`,
  [white, black, winner, loser, matchID]
  ).then(res => res.rows)
};

exports.updateMatch = updateMatch;



