import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import UserListItem from './UserListItem';
// import FriendList from ''

export default function RequestList(props) {
  const {currentUser, requests} = props;
  
  const parsedRequestList = requests.map(request => {
    return (
      <ListGroup.Item>
        <UserListItem
          currentUser={currentUser}
          type={"request"}
          isFriend={false}
          user={request}
        />
      </ListGroup.Item>
    );
  })

  return (
    <ListGroup variant="flush">
        {parsedRequestList}  
    </ListGroup>
  )
}