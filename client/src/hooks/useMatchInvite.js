import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const WAITING_FOR_OPPONENT = "WAITING_FOR_OPPONENT";

const OPPONENT_UNAVAIL = 'OPPONENT_UNAVAIL';
const GET_OPPONENT_STATUS = "GET_OPPONENT_STATUS"
const OPPONENT_STATUS = "OPPONENT_STATUS"

const SOCKET_SERVER_URL = process.env.REACT_APP_WEBSOCKET_URL ? 
  process.env.REACT_APP_WEBSOCKET_URL : "http://localhost:8001";

const useMatchInvite = (currentUser, gameOptions, goToView) => {
  const socketRef = useRef();
  socketRef.current = io(SOCKET_SERVER_URL);
  const [opponentStatus, setOpponentStatus] = useState(0);

  useEffect(() => {
    if (opponentStatus === 0) {
      //ask for opponent status
      socketRef.current.on("connect", ()=> {
        socketRef.current.emit(GET_OPPONENT_STATUS, {
          currentUser,
          opponent: gameOptions.opponent,
          gameOptions,
          socketId: socketRef.current.id,
        })
      });

      //listen for server response about opponent status
      socketRef.current.on(OPPONENT_STATUS, (data) => {
        const {status} = data;
        console.log("opponent status is: ", status);
        //update state accordingly
        if (status) setOpponentStatus(1);
        else setOpponentStatus(-1);
      });
    } else if (opponentStatus === 1) {
        //go to game accept
        goToView(WAITING_FOR_OPPONENT);
    } else if (opponentStatus === -1) {
        //go to opponent busy
        goToView(OPPONENT_UNAVAIL);
    }
  }, [opponentStatus]);


  return {
    opponentStatus
  };
};

export default useMatchInvite;
