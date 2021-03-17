import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// first queue up send user info to socket
// socket will sort and match two players
// socket does query and recieves match
// will send back user1 { matchID }
// will send back user2 { matchID } 
// redirect user to matchiD

const QUEUE = "queue";
const RANKED_ACCEPT = "RANKED_ACCEPT";
const CASUAL_ACCEPT = "CASUAL_ACCEPT";
const SOCKET_SERVER_URL = "http://localhost:8001";

//  userInfo = { userId, type, elo }
const useAcceptStatus = (gameOptions, setGameRoute) => {
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
    socketRef.current.on("connect", ()=> {
      if(matchAcceptStatus.currentUser) {
        //send socket message that you have accepted
        socketRef.current.emit(RANKED_ACCEPT, {
          userId: gameOptions.currentUser.id,
          socketId: socketRef.current.id,
          confirmation: true
        })
      }
  
      //listen for opponent accept from socket
      socketRef.current.on(RANKED_ACCEPT, (data) => {
        opponentAccept();
        console.log(data, "RANKED ACCEPT")
        const {matchId} = data;
        //send back match id which then client can render "/game/matchId"
        setGameRoute(`/game/${matchId}`);
        //we redirect them to game
      });
      socketRef.current.on(CASUAL_ACCEPT, (data) => {
        
      });
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
