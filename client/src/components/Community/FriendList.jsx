import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import UserListItem from './UserListItem';
// import FriendList from ''

export default function FriendList(props) {
  const {currentUser, friends} = props;
  
  console.log(friends);
  const parsedFriendList = friends.map(friend => {
    return (
      <ListGroup.Item>
        <UserListItem
          currentUser={currentUser}
          type={"user"}
          isFriend={true}
          user={friend}
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