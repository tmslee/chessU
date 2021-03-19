import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUserList(currentUser) {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const getFriends = function () {
    if(currentUser){
      axios.get(`http://localhost:8001/api/friends/${currentUser.id}`)
      .then( res => {
        setFriends(res.data)
      });
    }
  };
  const getFriendRequests = function (){
    if(currentUser){
      axios.get(`http://localhost:8001/api/friendRequests/${currentUser.id}`)
      .then( res => {
        setRequests(res.data)
      });
    }
  }
  const getFriendRequestsByMe = function (){
    if(currentUser){
      axios.get(`http://localhost:8001/api/friendRequestsByMe/${currentUser.id}`)
      .then( res => {
        console.log(res.data);
        setMyRequests(res.data)
      });
    }
  }

  const removeFriend = async function (currentUserID, userID) {
    await axios.delete(`http://localhost:8001/api/friends/${currentUserID}/${userID}`)
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }
  const sendFriendRequest = async function (currentUserID, userID) {
    await axios.post(`http://localhost:8001/api/friends/${currentUserID}/${userID}`);
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }
  const acceptFriendRequest = async function (currentUserID, userID) {
    await axios.post(`http://localhost:8001/api/friendRequests/${currentUserID}/${userID}`);
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }
  const declineFriendRequest = async function (currentUserID, userID) {
    await axios.delete(`http://localhost:8001/api/friendRequests/${currentUserID}/${userID}`);
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }

  useEffect(() => {
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
  }, [currentUser]);

  return {
    friends,
    requests,
    myRequests,
    getFriends,
    getFriendRequests,
    getFriendRequestsByMe,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
  }
}