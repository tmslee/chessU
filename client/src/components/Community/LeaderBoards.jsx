import React, {useState, useEffect} from 'react';
import {Tabs, Tab, ListGroup} from "react-bootstrap";
import UserListItem from "./UserListItem";
import axios from "axios";
import useUserState from './../../hooks/useUserList';

export default function LeaderBoards(props) {
  const { currentUser } = props;
  const [gameType, setgameType] = useState('ranked30');
  const [users, setUsers] = useState([]);

  const {
    friends,
    requests,
    myRequests,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
  } = useUserState(currentUser);

  useEffect( () => {
    axios.get(`http://localhost:8001/api/leaderboards/${gameType}`)
    .then( res => {
      setUsers(res.data)
    });
  }, [gameType])
  // setUsers(res.data)

  const isFriend = function (user) {
    for(const friend of friends){
      if(friend.id === user.id) return true;
    }
    return false;
  }
  const isPending = function (user){
    for(const friend of myRequests){
      if(friend.id === user.id) return true;
    }
    return false;
  }
  const isRequesting = function (user){
    for(const friend of requests){
      if(friend.id === user.id) return true;
    }
    return false;
  }

  const getRankIdx = function (user, sortedUsers){
    for(let i = 0 ; i < sortedUsers.length ; i++){
      if(sortedUsers[i].id === user.id) return i;
    }
  }

  const getRank = function (user, sortedUsers) {
    const numUsers = sortedUsers.length;
    const idx = getRankIdx(user, sortedUsers);
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

  const userListRender = users.map(user => {
 
    return(
      <ListGroup.Item
        key={user.id}
      >
        <UserListItem 
          currentUser={currentUser}
          isFriend={isFriend(user)}
          isPending={isPending(user)}
          isRequesting={isRequesting(user)}
          user={user}
          removeFriend={removeFriend}
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
          gameType={gameType}
          rank={getRank(user, users)}
        />
      </ListGroup.Item>
    )
  });

  
  // I NEED TO GRAB user object of { profile_img, username, elo, isFriend }

  return (
    <div>
      { users && gameType &&
      <Tabs
      id="controlled-tab-example"
      activeKey={gameType}
      onSelect={(k) => setgameType(k)}
      >
        <Tab eventKey="ranked30" title="30 minutes ranked">
          <ListGroup variant="flush">
            {userListRender}
          </ListGroup>
        </Tab>
        <Tab eventKey="ranked10" title="10 minutes ranked">
          <ListGroup variant="flush">
            {userListRender}
          </ListGroup>
        </Tab>
      </Tabs>
    } 
    </div>
  );
}