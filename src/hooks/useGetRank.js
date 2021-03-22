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

export default function useGetRank(currentUser) {
  const [ranked30, setRanked30] = useState([]);
  const [ranked10, setRanked10] = useState([]);

  const getRankIdx = function (user, sortedUsers){
    for(let i = 0 ; i < sortedUsers.length ; i++){
      if(sortedUsers[i].id === user.id) return i;
    }
  }
  const getRankIdxByUser = function (username, sortedUsers){
    for(let i = 0 ; i < sortedUsers.length ; i++){
      if(sortedUsers[i].username === username) return i;
    }
  }

  const getRank = function (user, sortedUsers, byUsername) {
    const numUsers = sortedUsers.length;
    const idx = byUsername? getRankIdxByUser(user, sortedUsers) : getRankIdx(user, sortedUsers);
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
      if (0 <= idx && idx <= increment-1) return "master";
      else if (increment <= idx && idx <= increment*2-1) return 'diamond'; 
      else if (increment*2 <= idx && idx <= increment*3-1) return 'plat'; 
      else if (increment*3 <= idx && idx <= increment*4-1) return 'gold'; 
      else if (increment*4 <= idx && idx <= increment*5-1) return 'silver'; 
      else return 'bronze';
    } 
    else { //remainder is less than increment 
      if (numUsers-increment <= idx && idx <= numUsers-1) return "bronze";
      else if (numUsers-increment*2 <= idx && idx <= numUsers-increment-1) return 'silver'; 
      else if (numUsers-increment*3 <= idx && idx <= numUsers-increment*2-1) return 'gold'; 
      else if (numUsers-increment*4 <= idx && idx <= numUsers-increment*3-1) return 'plat'; 
      else if (numUsers-increment*5 <= idx && idx <= numUsers-increment*4-1) return 'diamond'; 
      else return 'master';
    }
  }

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

  useEffect(() => {
    getRanked30();
    getRanked10();
  }, [currentUser]);

  const getOverallRank = function (ranked30, ranked10, user) {
    const rank30 = getRank(user, ranked30, false);
    const rank10 = getRank(user, ranked10, false);
    const overallRank = rankMap[rank30] >= rankMap[rank10] ? rank30 : rank10;
    return overallRank;
  }
  const getOverallRankByUserName = function (ranked30, ranked10, user) {
    const rank30 = getRank(user, ranked30, true);
    const rank10 = getRank(user, ranked10, true);
    const overallRank = rankMap[rank30] >= rankMap[rank10] ? rank30 : rank10;
    return overallRank;
  }
  return {
    ranked10,
    ranked30,
    getOverallRank,
    getOverallRankByUserName
  }
}