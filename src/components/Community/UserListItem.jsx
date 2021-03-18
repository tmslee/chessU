import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";

export default function UserListItem(props) {
  const {type, isFriend, username, profileImg, elo} = props;
  
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
        
        </Col>
        <Col>
        
        </Col>
        <Col>
        
        </Col>
        <Col>
          {type === "user" && isFriend && 
            <>
            <Row>
              <Button variant="primary" onClick={inviteToGame}>invite to a game</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={removeFriend}>remove Friend</Button>
            </Row> 
            </>
          }
          {type === "user" && !isFriend &&
            <Button variant="primary" onClick={sendFriendRequest}>invite to a game</Button>
          }
          {type === "request" && 
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