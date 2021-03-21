import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import UserListItem from './UserListItem';
// import FriendList from ''

export default function RequestList(props) {
  const {
    currentUser, 
    requests,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    ranked10,
    ranked30,
    getOverallRank
  } = props;
  
  const parsedRequestList = requests.map(request => {
    return (
      <ListGroup.Item
        key={request.id}
      >
        <UserListItem
          currentUser={currentUser}
          type={"request"}
          isFriend={false}
          isPending={false}
          isRequesting={true}
          user={request}
          removeFriend={removeFriend}
          sendFriendRequest={sendFriendRequest}
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
          rank={getOverallRank(ranked30, ranked10, request)}
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