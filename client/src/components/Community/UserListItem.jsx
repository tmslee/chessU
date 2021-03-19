import React, { useEffect } from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";

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

  const inviteToGame = function () {
    console.log('inviting to game');
  }
  
  return (
    <Container>
      <Row>
        <Col>
          <img
            width={64}
            height={64}
            className="align-self-start mr-3"
            src={user.profileImg}
            alt="Generic placeholder"
          />
        </Col>
        <Col>
          <h5>{user.username}</h5>
        </Col>
        <Col>
        {gameType === "ranked30" &&
          <h5>Elo: {user.ranked30}</h5>
        }
        {gameType === "ranked10" &&
          <h5>Elo: {user.ranked10}</h5>
        }
        </Col>
        <Col>
          {currentUser && isFriend && 
            <>
            <Row>
              <Button variant="primary" onClick={() => {inviteToGame(currentUser.id, user.id)}}>invite to a game</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={() => {removeFriend(currentUser.id, user.id)}}>remove friend</Button>
            </Row> 
            </>
          }
          {currentUser && !isFriend && isRequesting &&
            <> 
            <Row>
              <Button variant="primary" onClick={() => {acceptFriendRequest(currentUser.id, user.id)}}>accept</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={() => {declineFriendRequest(currentUser.id, user.id)}}>decline</Button>
            </Row> 
            </>
          }
          
          {currentUser && !isFriend && !isRequesting && !isPending &&
            <Button variant="primary" onClick={() => {sendFriendRequest(currentUser.id, user.id)}}>add as friend</Button>
          }
          {currentUser && !isFriend && !isRequesting && isPending &&
            <Button variant="danger" onClick={() => {removeFriend(currentUser.id, user.id)}}>cancel friend request</Button>
          }

        </Col>
      </Row>
    </Container>
  )
}