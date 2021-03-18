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

