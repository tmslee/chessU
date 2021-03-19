const db = require("../db");

const allUsers = function() {
  return db.query(`
  SELECT * FROM users;`,
  ).then(res => res.rows)
};

exports.allUsers = allUsers;

const getUserWithId = function(userId) {
  return db.query(`
  SELECT * FROM users
  where id = $1
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.getUserWithId = getUserWithId;

const addUser = function(username, email, password) {
  return db.query(`
  INSERT INTO users (username, email, password) 
  VALUES ($1, $2, $3) 
  RETURNING *;`,
  [username, email, password]
  ).then(res => res.rows[0])
};

exports.addUser = addUser;

const editUser = function(username, email, password, userId) {
  return db.query(`
  UPDATE users SET 
    username=$1::text, 
    email=$2::text, 
    password=$3::text
  WHERE id = $4::integer 
  RETURNING *;`,
  [username, email, password, userId]
  ).then(res => res.rows[0])
};

exports.editUser = editUser;

const deleteUser = function(userId) {
  return db.query(`
  DELETE FROM users 
  WHERE id = $1::integer
  RETURNING *;
  `,
  [userId]
  ).then(res => res.rows[0])
};

exports.deleteUser = deleteUser;

const getUserWithName = function(name) {
  return db.query(`
  SELECT * FROM users
  where username = $1
  `,
  [name]
  ).then(res => res.rows[0])
};

exports.getUserWithName = getUserWithName;

const updateEloById = function(updatedElo, userId, type){
  return db.query(`
  UPDATE user SET
  &1 = $2
  WHERE id = $3
  `, [type, updatedElo, userId])
  .then(res => res.rows[0]);
}

exports.updateEloById = updateEloById;