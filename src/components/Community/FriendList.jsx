import React from 'react';
import {ListGroup} from "react-bootstrap";
import UserListItem from './UserListItem';

export default function FriendList(props) {
  const {
    currentUser, 
    friends,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    ranked10,
    ranked30,
    getOverallRank
  } = props;
  
  const parsedFriendList = friends.map(friend => {
    return (
      <ListGroup.Item 
        key={friend.id}
      >
        <UserListItem
          currentUser={currentUser}
          isFriend={true}
          isPending={false}
          isRequesting={false}
          user={friend}
          removeFriend={removeFriend}
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
          rank={getOverallRank(ranked30, ranked10, friend)}
        />
      </ListGroup.Item>
    );
  })

  return (
    <ListGroup variant="flush">
        {parsedFriendList}  
    </ListGroup>
  )
}