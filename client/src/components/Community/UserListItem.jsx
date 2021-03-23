import React from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import "./styles/UserListItem.scss";
import bronze from './../../../src/images/bronze.png'
import silver from './../../../src/images/silver.png'
import gold from './../../../src/images/gold.png'
import plat from './../../../src/images/plat.png'
import diamond from './../../../src/images/diamond.png'
import master from './../../../src/images/master.png'

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

  const currentUserID = currentUser? currentUser.id : null;

  const getRankImg = function (rank) {
    switch(rank) {
      case "bronze":
        return bronze;
      case "silver":
        return silver;
      case "gold":
        return gold;
      case "plat":
        return plat;
      case "diamond":
        return diamond;
      case "master":
        return master;
      default:
        return bronze;
    }
  }

  const getRanking = function (elo) {
    if(0 <= elo && elo <= 1149) return 'bronze';
    else if (1150 <= elo && elo <= 1499) return 'silver';
    else if (1500 <= elo && elo <= 1849) return 'gold';
    else if (1850 <= elo && elo <= 2199) return 'plat';
    else if (2200 <= elo && elo <= 2500) return 'diamond';
    else return 'master';
  }

  let userElo;
  if (!gameType) userElo = user.ranked10 <= user.ranked30 ? user.ranked30 : user.ranked10; 
  else if (gameType === "ranked30") userElo = user.ranked30;
  else userElo = user.ranked10;

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

        <Col className="user-rank">
          <img
              height={50}
              className="align-self-start mr-3"
              src={getRankImg(getRanking(userElo))}
              alt="rank"
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