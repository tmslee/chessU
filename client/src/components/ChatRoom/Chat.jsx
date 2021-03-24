import React, {useState, useEffect} from "react";

import "./ChatRoom.scss";
import useChat from "../../hooks/chat";

const Chat = (props) => {
  const roomId = props.roomId;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [style, setStyle] = useState({
    display: 'none'
  })
  const [width, setWindowWidth] = useState(0);

  useEffect(() => { 

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => 
      window.removeEventListener("resize",updateDimensions);
   }, [])

   const updateDimensions = () => {
     const width = window.innerWidth > 1023 ? window.innerWidth * 0.5 : window.innerWidth * 0.8
     setWindowWidth(width)
   }

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleChat = () => {
    if (style.display === "none") {
      const newStyle = {
        display: "flex",
        flexDirection: "column",
        border: "3px solid black",
        borderRadius: "15px",
        position: "fixed",
        width: width,
        height: "80%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        zIndex: "5",
        animation: "slide-up 0.5s"
      }
      setStyle(newStyle)
    } else {
      const newStyle = {
        display: "none"
      }
      setStyle(newStyle)
    }
  }

  const messageShow = function(){
    return messages.map((message, i) => {
      if(message.body){
        return(
          <li key={i}
            className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
            {message.body}
          </li>
        )
      }}
    )
  }

  return (
    <div>
    <button class="open-button" onClick={handleChat}>Chat</button>
    <div className="chat-room-container" style={style}>
      <div className="messages-container">
        <ol className="messages-list">{messageShow()}</ol>
      </div>
      <div>
        <form onSubmit={handleSendMessage} class="text-send">
        <input
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        /> 
        <button type="submit" className="btn btn-outline-success send-message-button">Send</button>
        <button onClick={handleChat} type="button" className="btn btn-outline-danger send-message-button">Close</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Chat;
