const router = require("express").Router();
const { 
  friends,
  friendRequests,
  addFriend,
  removeFriend,
  acceptFriendRequest,
  declineFriendRequest
} = require("../db_helpers/db_community_helpers")

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

  router.post('/friends/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    addFriend(currentUserID, userID)
    .catch( err => res.json(err))
  })

  router.delete('/friends/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    removeFriend(currentUserID, userID)
    .catch( err => res.json(err))
  })

  router.post('/friendRequests/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    acceptFriendRequest(currentUserID, userID)
    .catch( err => res.json(err))
  })

  router.delete('/friendRequests/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    declineFriendRequest(currentUserID, userID)
    .catch( err => res.json(err))
  })

  return router;
}