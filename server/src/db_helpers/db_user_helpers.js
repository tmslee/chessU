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

const getMatchesByUser = function(userId) {
  return db.query(`
  SELECT 
  u1.username as winner, 
  u1.profile_img as winner_img,
  u1.ranked30 as winRanked30Elo,
  u1.ranked10 as winRanked10Elo,
  u1.casual as winCasualElo, 
  u2.username as loser, 
  u2.profile_img as loser_img,
  u2.ranked30 as loseRanked30Elo,
  u2.ranked10 as loseRanked10Elo,
  u2.casual as loseCasualElo,
  m.type as type
  FROM
  users u1 JOIN 
  matches m ON u1.id = m.winner 
  JOIN users u2 ON u2.id = m.loser
  WHERE u1.id = $1 OR u2.id = $1;
  `, [userId])
  .then(res => res.rows)
}

exports.getMatchesByUser = getMatchesByUser;

