const router = require("express").Router();
const { 
  friends,
  friendRequests,
  addFriend,
  removeFriend
} = require("../db_helpers/db_leaderboard_helpers")

module.exports = db => {

  router.get('/friends/:userID', (req, res) => {
    const currentUserID = req.params.userID;
    friends(currentUserID)
    .then( friends => {
      res.json(friends);
    })
    .catch( err => res.json(err))
  })

  router.get('/friendRequests/:userID', (req, res) => {
    const currentUserID = req.params.userID;
    friendRequests(currentUserID)
    .then( friendRequests => {
      res.json(friendRequests);
    })
    .catch( err => res.json(err))
  })

  router.post('/friendRequests/:userID', (req, res) => {
    const currentUserID = req.params.userID;
    friends(currentUserID, userID)
    .catch( err => res.json(err))
  })

  router.delete('/friendRequests/:userID', (req, res) => {
    const currentUserID = req.params.userID;
    friends(currentUserID, userID)
    .catch( err => res.json(err))
  })

  return router;
}