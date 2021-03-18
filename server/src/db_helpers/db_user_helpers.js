const db = require("../db");

const allUsers = function(userId) {
  return db.query(`
  SELECT * FROM users;`,
  [userId]
  ).then(res => res.rows)
};

exports.allUsers = allUsers;

const individualUser = function(userId) {
  return db.query(`
  SELECT * FROM users where id = $1;`,
  [userId]
  ).then(res => res.rows[0])
};

exports.individualUser = individualUser;

const addUser = function(username, email, password) {
  return db.query(`
  INSERT INTO users (username, email, password) 
  VALUES ($1, $2, $3) 
  RETURNING *;`,
  [userId]
  ).then(res => res.rows[0])
};

exports.addUser = addUser;

const editUser = function(username, email, password) {
  return db.query(`
  UPDATE users SET 
    username=$1::text, 
    email=$2::text, 
    password=$3::text
  WHERE id = $4::integer 
  RETURNING *;`,
  [userId]
  ).then(res => res.rows)
};

exports.editUser = editUser;


