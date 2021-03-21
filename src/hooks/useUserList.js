import { useState, useEffect } from 'react';
import axios from 'axios';

const rankMap = {
  "bronze":0,
  "silver":1,
  "gold":2,
  "plat":3,
  "diamond":4,
  "master":5
};

export default function useUserList(currentUser) {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [ranked30, setRanked30] = useState([]);
  const [ranked10, setRanked10] = useState([]);

  const getRankIdx = function (user, sortedUsers){
    for(let i = 0 ; i < sortedUsers.length ; i++){
      if(sortedUsers[i].id === user.id) return i;
    }
  }

  const getRank = function (user, sortedUsers) {
    const numUsers = sortedUsers.length;
    const idx = getRankIdx(user, sortedUsers);
    console.log(idx);
    const increment = Math.floor(numUsers/5);
    const rem = numUsers-increment*5;
    
    if(numUsers <= 6) {
      switch(idx) {
        case 0:
          return "master"; 
        case 1:
          return "diamond"; 
        case 2:
          return "plat"; 
        case 3:
          return "gold"; 
        case 4:
          return "silver"; 
        case 5:  
          return "bronze"; 
        default:
          return "bronze";
      }
    } else if (rem > increment){ //remiander is greater than increment
      if (0 <= idx <= increment-1) return "master";
      else if (increment <= idx <= increment*2-1) return 'diamond'; 
      else if (increment*2 <= idx <= increment*3-1) return 'plat'; 
      else if (increment*3 <= idx <= increment*4-1) return 'gold'; 
      else if (increment*4 <= idx <= increment*5-1) return 'silver'; 
      else return 'bronze';
    } 
    else { //remainder is less than increment 
      if (numUsers-increment <= idx <= numUsers-1) return "bronze";
      else if (numUsers-increment*2 <= idx <= numUsers-increment-1) return 'silver'; 
      else if (numUsers-increment*3 <= idx <= numUsers-increment*2-1) return 'gold'; 
      else if (numUsers-increment*4 <= idx <= numUsers-increment*3-1) return 'plat'; 
      else if (numUsers-increment*5 <= idx <= numUsers-increment*4-1) return 'diamond'; 
      else return 'master';
    }
  }

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
  };
  const getFriendRequestsByMe = function (){
    if(currentUser){
      axios.get(`http://localhost:8001/api/friendRequestsByMe/${currentUser.id}`)
      .then( res => {
        console.log(res.data);
        setMyRequests(res.data)
      });
    }
  };
  const getRanked30 = function () {
    axios.get(`http://localhost:8001/api/leaderboards/ranked30`)
    .then( res => {
      console.log("leaderboad users: " , res.data)
      setRanked30(res.data)
    });
  };
  const getRanked10 = function () {
    axios.get(`http://localhost:8001/api/leaderboards/ranked10`)
    .then( res => {
      console.log("leaderboad users: " , res.data)
      setRanked10(res.data)
    });
  };

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
  const getOverallRank = function (ranked30, ranked10, user) {
    const rank30 = getRank(currentUser, ranked30);
    const rank10 = getRank(currentUser, ranked10);
    const overallRank = rankMap[rank30] >= rankMap[rank10] ? rank30 : rank10;
    return overallRank;
  }

  useEffect(() => {
    getFriends();
    getFriendRequests();
    getFriendRequestsByMe();
    getRanked30();
    getRanked10();
  }, [currentUser]);

  return {
    friends,
    requests,
    myRequests,
    ranked10,
    ranked30,
    getFriends,
    getFriendRequests,
    getFriendRequestsByMe,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getOverallRank
  }
}