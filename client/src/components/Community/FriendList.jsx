import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import UserListItem from './UserListItem';
// import FriendList from ''

export default function FriendList(props) {
  const {currentUser, friends} = props;

  const parsedFriendList = friends.map(friend => {
    return (
      <UserListItem
        type={"user"}
        isFriend={true}
      />
    );
  })

  return (
    <ListGroup variant="flush">
      <ul>
        {parsedFriendList}  
      </ul>
    </ListGroup>
  )
}