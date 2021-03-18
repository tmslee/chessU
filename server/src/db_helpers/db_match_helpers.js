const db = require("../db");

const addMatch = function(type, user1, user2) {
  return db.query(`
  INSERT INTO matches 
  (type, user1_id, user2_id) 
  VALUES ($1::text, $2::integer, $3::integer) 
  RETURNING *;`,
  [type, user1, user2]
  ).then(res => res.rows[0].id)
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

const updateMatch = function(type, user1ID, user2ID, winner, loser, matchID) {
  return db.query(`
  UPDATE matches SET 
    type = $1::text,
    user1_id = $2::integer, 
    user2_id = $3::integer,  
    winner = $4::integer,
    loser = $5::integer
  WHERE id = $6::integer
  RETURNING *;`,
  [type, user1ID, user2ID, winner, loser, matchID]
  ).then(res => res.rows)
};

exports.updateMatch = updateMatch;



