import React from 'react';
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
    declineFriendRequest
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