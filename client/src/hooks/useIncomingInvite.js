import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const GAME_INVITE = "GAME_INVITE";
const MATCH_CONFIRM = "MATCH_CONFIRM";
const SOCKET_INIT ="SOCKET_INIT";

const SOCKET_SERVER_URL = "http://localhost:8001";

const useIncomingInvite = (currentUser, loadGame) => {
  const socketRef = useRef();
  
  const [gameTimeLimit, setGameTimeLimit] = useState(null);
  const [gameType, setGameType] = useState(null);
  const [gameOpponent, setGameOpponent] = useState(null);

  const [invitedStatus, setInvitedStatus] = useState(false);
  const [acceptStatus, setAcceptStatus] = useState(0);

  socketRef.current = io(SOCKET_SERVER_URL);

  useEffect(()=> {
    socketRef.current.on("connect", () => {
      if(currentUser && socketRef.current.id){
        socketRef.current.emit(SOCKET_INIT, {
          socketId:socketRef.current.id,
          userId: currentUser.id,
          name: currentUser.username
        });  
      }
    });
  });

  useEffect(()=> {
    socketRef.current.on(GAME_INVITE, (data)=> {
      console.log("invite received");
      const {gameOptions} = data;
      // console.log(gameOptions);
      setGameTimeLimit(gameOptions.timeLimit);
      setGameType(gameOptions.type);
      setGameOpponent(gameOptions.currentUser);
      //set gameOptions from server's game invite message 
      setInvitedStatus(true);
    });

    socketRef.current.on(MATCH_CONFIRM, (data) => {
      //if confirmation match id is null -> we exit
      const {matchId} = data;
      if (!data.matchId) {
        console.log("match declined");
      } else {
        console.log("match made");
        loadGame(data, currentUser, gameOpponent, matchId, gameTimeLimit);
      }
      //set invited status to false
      setInvitedStatus(false);
    });

  });

  useEffect(()=> {
      if (acceptStatus === 1 || acceptStatus === -1) {
        setInvitedStatus(false);
        socketRef.current.emit(MATCH_CONFIRM, {
          timeLimit: gameTimeLimit,
          type: gameType,
          currentUser,
          socketId: socketRef.current.id,
          confirmation: acceptStatus
        });
        setAcceptStatus(0);
      }
  }, [acceptStatus]);

  return {
    invitedStatus,
    setInvitedStatus,
    acceptStatus,
    setAcceptStatus,
    gameOpponent
  };
};

export default useIncomingInvite;
