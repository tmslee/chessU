const router = require("express").Router();
const { 
  friends,
  friendRequests,
  friendRequestsByMe,
  addFriend,
  removeFriend,
  acceptFriendRequest,
  declineFriendRequest,
  searchUser
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

  router.get('/friendRequestsByMe/:userID', (req, res) => {
    const currentUserID = req.params.userID;
    friendRequestsByMe(currentUserID)
    .then( friendRequests => {
      res.json(friendRequests);
    })
    .catch( err => res.json(err))
  })

  router.post('/friends/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    addFriend(currentUserID, userID)
    .then(addedFriend => res.json(addedFriend))
    .catch( err => res.json(err))
  })

  router.delete('/friends/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    removeFriend(currentUserID, userID)
    .then(deletedFriends => res.json(deletedFriends))
    .catch( err => res.json(err))
  })

  router.post('/friendRequests/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    acceptFriendRequest(currentUserID, userID)
    .then(acceptedFriend => res.json(acceptedFriend))
    .catch( err => res.json(err))
  })

  router.delete('/friendRequests/:currentUserID/:userID', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const userID = req.params.userID
    declineFriendRequest(currentUserID, userID)
    .then(declinedFriend => res.json(declinedFriend))
    .catch( err => res.json(err))
  })

  router.get('/user_search/:currentUserID/:searchTerm', (req, res) => {
    const currentUserID = req.params.currentUserID;
    const searchTerm = req.params.searchTerm;
    searchUser(searchTerm, currentUserID)
    .then(searchResults => res.json(searchResults))
    .catch( err => res.json(err))
  })

  return router;
}