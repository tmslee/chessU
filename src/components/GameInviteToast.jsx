import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Toast, Button} from "react-bootstrap";
import useIncomingInvite from "../hooks/useIncomingInvite";

export default function GameInviteToast(props) {
  const {currentUser, setGameInfo} = props;
  const history = useHistory();

  const loadGame = function (data, currentUser, opponent, matchId, timeLimit) {
    setGameInfo({
      matchId : data.matchId,
      colors : data.colors, // { white : id, black : id }
      name1 : currentUser.username,
      name2 : opponent.username,
      timeLimit
    })
    history.push(`/game/${matchId}`);
  }

  const {
    invitedStatus, 
    setInvitedStatus, 
    acceptStatus, 
    setAcceptStatus,
    gameOpponent
  } = useIncomingInvite(currentUser, loadGame);

  return(
    <Toast 
      show={invitedStatus} 
      onClose={() => {setAcceptStatus(-1);}}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">Game Invite</strong>
        <small>from {gameOpponent? gameOpponent.username : null}</small>
      </Toast.Header>
      <Toast.Body>
        <Button variant="primary" onClick={() => {
          setAcceptStatus(1);
        }}>
          Accept
        </Button>
        <Button variant="secondary" onClick={() => {
          setAcceptStatus(-1);
        }}>
          Decline
        </Button>
      </Toast.Body>
    </Toast>
  );
}