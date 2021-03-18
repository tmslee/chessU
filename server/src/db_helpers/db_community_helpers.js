const db = require("../db");

const friends = function(currentUserID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};
exports.friends = friends;

const friendRequests = function(currentUserID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};
exports.friendRequests = friendRequests;

const addFriend = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};
exports.addFriend = addFriend;

const removeFriend = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  ).then(res => res.rows)
};
exports.removeFriend = removeFriend;