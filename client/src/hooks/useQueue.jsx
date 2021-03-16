import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// first queue up send user info to socket
// socket will sort and match two players
// socket does query and recieves match
// will send back user1 { matchID }
// will send back user2 { matchID } 
// redirect user to matchiD

const QUEUE = "queue";
const RANKED = "RANKED";
const CASUAL = "CASUAL";
const SOCKET_SERVER_URL = "http://localhost:8002";

//  userInfo = { userId, type, elo }
const useQueue = (gameOptions) => {
  const socketRef = useRef();

  // queue states ////////////////////////////////////////
  const[inQueue, setQueue] = useState(false);
  const enqueue = function () {
    setQueue(true);
  }
  const dequeue = function () {
    setQueue(false);
  }

  // state change handling
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    if (inQueue) {
      console.log(`joining queue: sending message to socket from user:`);
      // send socket message that youre going into queue
      // we need gameOptions here to determine which message we are sending
      
      socketRef.current.emit(gameOptions.type, {
        userId: gameOptions.currentUserId,
        elo: null,
        socketId: socketRef.current.id,
      })
      

      socketRef.current.on(RANKED, (data) => {
        //we are matched up!
        // dequeue
      });

      socketRef.current.on(CASUAL, (data) => {
        
      });
    }

    //listen for match found message from socket
  }, [inQueue]);

  return {
    inQueue,
    enqueue,
    dequeue
  };
};

export default useQueue;
