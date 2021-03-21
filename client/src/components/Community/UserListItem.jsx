import React, { useEffect } from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import "./styles/UserListItem.scss";

export default function UserListItem(props) {
  const {
    currentUser,
    isFriend,
    isPending, 
    isRequesting,
    user,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    gameType
  } = props;
  //type: "user" or "request" 

  const currentUserID = currentUser? currentUser.id : null;

  const inviteToGame = function () {
    console.log('inviting to game');
  }
  
  return (
    <Container className="user-item-container">
      <Row className="user-item-row">
        <Col className="user-item-image">
          <img
            width={64}
            height={64}
            className="align-self-start mr-3"
            src={user.profile_img}
            alt="Generic placeholder"
          />
        </Col>
        <Col className="user-item-username">
          <h5>{user.username}</h5>
        </Col>
        <Col  className="user-item-gameType">
        {gameType === "ranked30" &&
          <h5>Elo: {user.ranked30}</h5>
        }
        {gameType === "ranked10" &&
          <h5>Elo: {user.ranked10}</h5>
        }
        </Col>
        <Col className="user-item-buttons">
          {currentUserID !== user.id && currentUser && isFriend && 
            <Row>
              <Button variant="danger" onClick={() => {removeFriend(currentUser.id, user.id)}}>remove friend</Button>
            </Row> 
          }
          {currentUserID !== user.id && currentUser && !isFriend && isRequesting &&
          <Container className="user-item-btn-container">
              <Button variant="primary" onClick={() => {acceptFriendRequest(currentUser.id, user.id)}}>accept friend request</Button>
              <Button variant="danger" onClick={() => {declineFriendRequest(currentUser.id, user.id)}}>decline friend request</Button>
          </Container>
          }
          
          {currentUserID !== user.id && currentUser && !isFriend && !isRequesting && !isPending &&
            <Button variant="primary" onClick={() => {sendFriendRequest(currentUser.id, user.id)}}>add as friend</Button>
          }
          {currentUserID !== user.id && currentUser && !isFriend && !isRequesting && isPending &&
            <Button variant="danger" onClick={() => {removeFriend(currentUser.id, user.id)}}>cancel friend request</Button>
          }

        </Col>
      </Row>
    </Container>
  )
}