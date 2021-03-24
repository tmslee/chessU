import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {Toast, Button} from "react-bootstrap";
import io from "socket.io-client";

const SOCKET_SERVER_URL = process.env.REACT_APP_WEBSOCKET_URL ? 
  process.env.REACT_APP_WEBSOCKET_URL : "http://localhost:8001";
const GAME_INVITE = "GAME_INVITE";
const MATCH_CONFIRM = "MATCH_CONFIRM";
const SOCKET_INIT ="SOCKET_INIT";

export default function GameInviteToast(props) {
  const {
    currentUser,
    setGameInfo,
    invitedStatus,
    setInvitedStatus,
    incomingGameInfo,
    setIncomingGameInfo
  } = props;

  const history = useHistory();
  const socketRef = useRef();
  socketRef.current = io(SOCKET_SERVER_URL);

  const loadGame = function (data, currentUser, opponent, timeLimit) {
    setGameInfo({
      matchId : data.matchId,
      colors : data.colors,
      name1 : currentUser.username,
      name2 : opponent.username,
      timeLimit
    })
    history.push(`/game/${data.matchId}`);
  }

  const [acceptStatus, setAcceptStatus] = useState(0);

  useEffect(()=> {
    console.log("invitedStatus: ", invitedStatus);

    socketRef.current.on("connect", () => {
      if(currentUser && socketRef.current.id){
        socketRef.current.emit(SOCKET_INIT, {
          socketId:socketRef.current.id,
          userId: currentUser.id,
          name: currentUser.username
        });  
      }

      if (!invitedStatus) {
        //listen for game inv message from server
        socketRef.current.on(GAME_INVITE, data => {
          console.log("invite received")
          const {gameOptions} = data;
          setIncomingGameInfo(gameOptions);
          setInvitedStatus(true);
        });
      }

      if(acceptStatus === 1 || acceptStatus === -1) {
        //send match accept msg to server
        socketRef.current.emit(MATCH_CONFIRM, {
          currentUser, 
          type : incomingGameInfo.type,
          socketId : socketRef.current.id,
          confirmation : acceptStatus,
          timeLimit : incomingGameInfo.timeLimit
        });

        //listen for match confim msg from server
        socketRef.current.on(MATCH_CONFIRM, data => {
          const {matchId} = data;
          if(matchId) {
            loadGame(
              data, 
              incomingGameInfo.opponent,
              incomingGameInfo.currentUser,
              incomingGameInfo.timeLimit 
            );
          }
          setAcceptStatus(0);
          setIncomingGameInfo(null);
          setInvitedStatus(false);    
        });
      }
    });

  })

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
        <strong className="mr-auto">Game Invite from {incomingGameInfo? incomingGameInfo.currentUser.username : null}</strong>
      </Toast.Header>
      <Toast.Body>
        <Button variant="primary" onClick={async () => {
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