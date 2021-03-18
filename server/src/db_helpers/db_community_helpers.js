const db = require("../db");

const friends = function(currentUserID) {
  return db.query(`
  SELECT * 
  FROM users JOIN (
      SELECT user1_id AS id FROM friends WHERE friends.user2_id = ${currentUserID}
      INTERSECT
      SELECT user2_id AS id FROM friends WHERE friends.user1_id = ${currentUserID}
    )AS friendIds
  ON users.id = friendIds.id;
  `)
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.friends = friends;

const friendRequests = function(currentUserID) {
  return db.query(`
    SELECT * 
    FROM users JOIN (
        SELECT accept.id AS id FROM
        (SELECT user1_id AS id FROM friends WHERE friends.user2_id = ${currentUserID}) as accept
        LEFT JOIN
        (SELECT user2_id AS  id FROM friends WHERE friends.user1_id = ${currentUserID}) as request
        ON accept.id = request.id
        WHERE request.id IS NULL
      )AS requestIds
    ON users.id = requestIds.id
    ORDER BY users.username;
  `)
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.friendRequests = friendRequests;

const addFriend = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  )
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.addFriend = addFriend;

const removeFriend = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  )
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.removeFriend = removeFriend;

const acceptFriendRequest = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  )
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.acceptFriendRequest = acceptFriendRequest;

const declineFriendRequest = function(currentUserID, userID) {
  return db.query(`
  SELECT profile_img, username, elo
  FROM users
  ORDER BY elo DESC;`
  )
  .then(res => res.rows)
  .catch(err => res.json(err));
};
exports.declineFriendRequest = declineFriendRequest;