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

// const addUser = function(user) {
//   return db.query(`
//   INSERT INTO users
//   (name, email, password)
//   VALUES ($1, $2, $3)
//   RETURNING *;`
//   , [user.name, user.email, user.password])
//     .then(res => res.rows[0]);
// };

// exports.addUser = addUser;