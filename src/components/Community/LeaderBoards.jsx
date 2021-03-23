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
    axios.get(`/api/leaderboards/${gameType}`)
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