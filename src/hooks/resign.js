import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const RESIGN = "RESIGN";
const SOCKET_SERVER_URL = "http://localhost:8001";

const useResign = (roomId) => {
  const [concede, setConcede] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(RESIGN, (message) => {
      const incomingConcedeMessage = {
        ...message,
        concededByCurrentUser: message.senderId === socketRef.current.id,
      };
      console.log(incomingConcedeMessage, concede);
      setConcede(incomingConcedeMessage);
    });

    // return () => {
    //   socketRef.current.disconnect();
    // };
    socketRef.current.on('disconnect', (message) => {
      const incomingConcedeMessage = {
        concededByCurrentUser: message.senderId === socketRef.current.id,
      };
      setConcede(incomingConcedeMessage);
    })

  }, [roomId]);

  console.log('re-render in resign')

  const sendConcedeMessage = (isResign) => {
    socketRef.current.emit(RESIGN, {
      body: isResign,
      senderId: socketRef.current.id,
    });
  };

  return { concede, sendConcedeMessage };
};

export default useResign;
