import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// first queue up send user info to socket
// socket will sort and match two players
// socket does query and recieves match
// will send back user1 { matchID }
// will send back user2 { matchID } 
// redirect user to matchiD

const IN_Q = "IN_Q";
const ACCEPT_MATCH = "ACCEPT_MATCH";

const ENQUEUE = "ENQUEUE"
const DEQUEUE = "DEQUEUE";
const SOCKET_SERVER_URL = "http://localhost:8001";
const RANKED_ACCEPT = "RANKED_ACCEPT";

//  userInfo = { userId, type, elo }
const useQueue = (gameOptions, setGameOptions, goToView, socket) => {
  const { currentUser, type, timeLimit } = gameOptions;
  console.log(currentUser);

  socket.current = io(SOCKET_SERVER_URL);
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
    socket.current.on("connect", () => {
      console.log(socket.current.id);

      if (inQueue) {
        console.log(`joining queue: sending message to socket from user:`);
        // send socket message that youre going into queue
        // we need gameOptions here to determine which message we are sending
        console.log('before sending to socketio', socket.current.id);

        socket.current.emit(ENQUEUE, {
          timeLimit,
          type,
          currentUser,
          socketId: socket.current.id,
        })
        
        // listening from server/socket
        socket.current.on(ENQUEUE, (data) => {
          console.log(data);
          
          const opponent = data.opponent;
          setGameOptions(prev => ({...prev, opponent}));
          goToView(ACCEPT_MATCH);
          dequeue();
          //we are matched up and send opponent id to AcceptTimer component
          
          //we want to set our gameOptions.opponentId 
          //display gameAccept

          // socketRef.current.emit(RANKED_ACCEPT, {
          //   confirmation: true,
          //   socketId: socketRef.current.id
          // })
        });
  

      } else if(currentUser) {
        //send a dequeue messsage to socket 
        socket.current.emit(DEQUEUE, {
          timeLimit,
          type,
          // userId: currentUser.id,
          // elo: currentUser.elo,
          currentUser,
          socketId: socket.current.id,
        })
      }
    });
    //listen for match found message from socket
  }, [inQueue]);

  return {
    inQueue,
    enqueue,
    dequeue
  };
};

export default useQueue;
