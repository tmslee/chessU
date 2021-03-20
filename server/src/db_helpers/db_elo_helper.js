const db = require("../db");

const getEloWithUseId30 = function(userId) {
  return db.query(`
  SELECT ranked30 FROM users
  where id = $1
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.getEloWithUseId30 = getEloWithUseId30;

const getEloWithUseId10 = function(userId) {
  return db.query(`
  SELECT ranked10 FROM users
  where id = $1
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.getEloWithUseId10 = getEloWithUseId10;

const getEloWithUseIdCasual = function(userId) {
  return db.query(`
  SELECT casual FROM users
  where id = $1
  `,
  [userId]
  ).then(res => res.rows[0])
}

exports.getEloWithUseIdCasual = getEloWithUseIdCasual;