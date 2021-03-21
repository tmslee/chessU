import React, {useState} from "react";

import "./ChatRoom.scss";
import useChat from "../../hooks/chat";

const Chat = (props) => {
  const roomId = props.roomId;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [style, setStyle] = useState({
    display: 'none'
  })

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
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
        width: "80%",
        height: "80%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        zIndex: "5"
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
      <div class="text-send">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} type="button" className="btn btn-outline-success send-message-button">Send</button>
        <button onClick={handleChat} type="button" className="btn btn-outline-success send-message-button">Close</button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
