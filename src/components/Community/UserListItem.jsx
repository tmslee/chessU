import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";

export default function UserListItem(props) {
  const {
    currentUser, 
    type, 
    isFriend, 
    user,
    gameType
  } = props;
  //type: "user" or "request" 

  const inviteToGame = function () {
    console.log('inviting to game');
  }
  const removeFriend = function () {
    console.log('removing friend');
  }
  const sendFriendRequest = function () {
    console.log('sending friend request');
  }
  const acceptFriendRequest = function () {
    console.log('accepted friend request');
  }
  const declineFriendRequest = function () {
    console.log('declined friend request');
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
          {currentUser && type === "user" && isFriend && 
            <>
            <Row>
              <Button variant="primary" onClick={inviteToGame}>invite to a game</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={removeFriend}>remove friend</Button>
            </Row> 
            </>
          }
          {currentUser && type === "user" && !isFriend &&
            <Button variant="primary" onClick={sendFriendRequest}>add as friend</Button>
          }
          {currentUser && type === "request" && 
            <> 
            <Row>
              <Button variant="primary" onClick={acceptFriendRequest}>accept</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={declineFriendRequest}>decline</Button>
            </Row> 
            </>
          }
        </Col>
      </Row>
    </Container>
  )
}