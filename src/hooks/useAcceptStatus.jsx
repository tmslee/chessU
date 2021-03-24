import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// first queue up send user info to socket
// socket will sort and match two players
// socket does query and recieves match
// will send back user1 { matchID }
// will send back user2 { matchID } 
// redirect user to matchiD
const GAME_INVITE = "GAME_INVITE";

const MATCH_CONFIRM = "MATCH_CONFIRM";
const SOCKET_SERVER_URL = process.env.REACT_APP_WEBSOCKET_URL ? 
  process.env.REACT_APP_WEBSOCKET_URL : "http://localhost:8001";

//  userInfo = { userId, type, elo }
const useAcceptStatus = (
  gameOptions, 
  returnToGameOptions,
   loadGame, 
   setGameInfo,
   initialAcceptStatus,
   setIncomingGameInfo,
   setInvitedStatus
   ) => {
  const socketRef = useRef();

  const { currentUser, type, opponent, timeLimit, matchType } = gameOptions;
  // match accept states /////////////////////////////////////
  const[userStatus, setUserStatus] = useState(initialAcceptStatus);
  const[opponentStatus, setOpponentStatus] = useState(0);


  const acceptMatch = () => setUserStatus(1);
  const declineMatch = () => setUserStatus(-1);
  const opponentAccept = () => setOpponentStatus(1);
  const opponentDecline = () => setOpponentStatus(-1);

  const declineThenGameOptions = async function () {
    await opponentDecline();
    returnToGameOptions();
    socketRef.current.on(GAME_INVITE, data => {
      console.log("invite received")
      const {gameOptions} = data;
      setIncomingGameInfo(gameOptions);
      setInvitedStatus(true);
    });
  }

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on("connect", ()=> {
      //send confirmation back to server
      socketRef.current.emit(MATCH_CONFIRM, {
        matchType,
        timeLimit,
        type,
        currentUser,
        socketId: socketRef.current.id,
        confirmation: userStatus
      });
    });
  }, [userStatus]);

  useEffect(() => {
    //listen for opponent confirmation
    socketRef.current.on(MATCH_CONFIRM, (data) => {
      //if confirmation match id is null -> we exit
      const {matchId} = data;
      if (!data.matchId) {
        declineThenGameOptions();
      } else {
        opponentAccept();
        const timeLimit = data.timeLimit;
        loadGame(data, currentUser, opponent, matchId, timeLimit);

      }
    });
  }, [userStatus, opponentStatus]);

  return {
    userStatus,
    opponentStatus,
    acceptMatch,
    declineMatch,
    opponentAccept,
    opponentDecline
  };
};

export default useAcceptStatus;
