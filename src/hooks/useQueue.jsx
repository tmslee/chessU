import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
const IN_Q = "IN_Q";
const ACCEPT_MATCH = "ACCEPT_MATCH";

const ENQUEUE = "ENQUEUE"
const DEQUEUE = "DEQUEUE";
const SOCKET_SERVER_URL = "http://localhost:8001";

//  userInfo = { userId, type, elo }
const useQueue = (gameOptions, setGameOptions, goToView) => {
  const { currentUser, type, timeLimit } = gameOptions;
  const socketRef = useRef();

  // queue states ////////////////////////////////////////
  const[inQueue, setQueue] = useState(false);
  const enqueue = function () {
    setQueue(true);
    goToView(IN_Q);
  }
  const dequeue = function () {
    setQueue(false);
  }

  // state change handling
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on("connect", () => {

      if (inQueue) {
        // send socket message that youre going into queue
        // we need gameOptions here to determine which message we are sending

        socketRef.current.emit(ENQUEUE, {
          timeLimit,
          type,
          currentUser,
          socketId: socketRef.current.id,
        })
        
        // listening from server/socket
        socketRef.current.on(ENQUEUE, (data) => {
          const matchType = data.matchType;
          const opponent = data.opponent;
          setGameOptions(prev => ({...prev, opponent, matchType}));
          goToView(ACCEPT_MATCH);
          dequeue();
        });
  

      } else if(currentUser) {
        //send a dequeue messsage to socket 
        socketRef.current.emit(DEQUEUE, {
          timeLimit,
          type,
          currentUser,
          socketId: socketRef.current.id,
        })
      }
    });
  }, [inQueue]);

  return {
    inQueue,
    enqueue,
    dequeue
  };
};

export default useQueue;
