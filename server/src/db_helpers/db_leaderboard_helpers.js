const db = require("../db");

const ranked30 = function() {
  return db.query(`
  SELECT profile_img, username, ranked30
  FROM users
  ORDER BY ranked30 DESC;`
  ).then(res => res.rows)
};

exports.ranked30 = ranked30;

const ranked10 = function() {
  return db.query(`
  SELECT profile_img, username, ranked10
  FROM users
  ORDER BY ranked10 DESC;`
  ).then(res => res.rows)
};

exports.ranked10 = ranked10;


