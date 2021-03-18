const db = require("../db");

const ranked30 = function() {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};

exports.ranked30 = ranked30;

const ranked10 = function() {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};

exports.ranked10 = ranked10;

const ranked0 = function() {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};

exports.ranked0 = ranked0;

