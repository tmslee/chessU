import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// first queue up send user info to socket
// socket will sort and match two players
// socket does query and recieves match
// will send back user1 { matchID }
// will send back user2 { matchID } 
// redirect user to matchiD

const QUEUE = "queue";
const SOCKET_SERVER_URL = "http://localhost:8002";

//  userInfo = { userId, type, elo }
const useAcceptStatus = (gameOptions) => {
  const socketRef = useRef();

  // match accept states /////////////////////////////////////
  const[matchAcceptStatus, setAcceptStatus] = useState({
    currentUser: false,
    opponent: false
  });
  const acceptMatch = function () {
    setAcceptStatus(prev => {
      return {...prev, currentUser: true};
    });
  }
  const opponentAccept = function () {
    setAcceptStatus(prev => {
      return {...prev, opponent: true};
    });
  }  

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    if(matchAcceptStatus.currentUser) {
      //send socket message that you have accepted 
    }
    

    //listen for opponent accept from socket
    socket.on(RANKED_ACCEPT, (data) => {
      //we should receive match info from here
      //we redirect them to game
    });
    socket.on(CASUAL_ACCEPT, (data) => {
      
    });

  }, [matchAcceptStatus]);
  ////////////////////////////////////////////////////////////
  return {
    matchAcceptStatus,
    acceptMatch,
    opponentAccept
  };
};

export default useAcceptStatus;
