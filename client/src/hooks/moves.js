import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const NEW_CHESS_MOVE_EVENT = "newChessMove";
const SOCKET_SERVER_URL = "http://localhost:8001";

const useMove = (roomId) => {
  const [currentMove, setCurrentMove] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // receive the move from the opponent
    socketRef.current.on(NEW_CHESS_MOVE_EVENT, (move) => {
      const incomingMove = {
        ...move,
        movedByCurrentUser: move.senderId === socketRef.current.id,
      };
      // setCurrentMove((moves) => [...moves, incomingMove]);
      setCurrentMove(incomingMove);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // send the move to the server and your opponent
  const sendMove = (move) => {
    socketRef.current.emit(NEW_CHESS_MOVE_EVENT, {
      body: move,
      senderId: socketRef.current.id,
    });
  };

  return { currentMove, sendMove };
};

export default useMove;
