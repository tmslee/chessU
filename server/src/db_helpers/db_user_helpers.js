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

const editAvatar = function(avatar, userId) {
  return db.query(`
  UPDATE users SET 
    profile_img = $1::text
  WHERE id = $2::integer 
  RETURNING *;`,
  [avatar, userId]
  ).then(res => res.rows[0])
};

exports.editAvatar = editAvatar;
const updateEloById30 = function(updatedElo, userId){
  return db.query(`
  UPDATE users SET
  ranked30 = $1
  WHERE id = $2
  RETURNING *;
  `, [updatedElo, userId])
  .then(res => console.log('elo update in db', res.rows[0]));
}

exports.updateEloById30 = updateEloById30;

const updateEloById10 = function(updatedElo, userId){
  return db.query(`
  UPDATE users SET
  ranked10 = $1
  WHERE id = $2
  RETURNING *;
  `, [updatedElo, userId])
  .then(res => console.log('elo update in db', res.rows[0]));
}

exports.updateEloById10 = updateEloById10;

const updateEloByIdCasual = function(updatedElo, userId){
  return db.query(`
  UPDATE users SET
  casual = $1
  WHERE id = $2
  RETURNING *;
  `, [updatedElo, userId])
  .then(res => console.log('elo update in db', res.rows[0]));
}

exports.updateEloByIdCasual = updateEloByIdCasual;