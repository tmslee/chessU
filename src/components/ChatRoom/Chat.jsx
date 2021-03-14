import React, {useState} from "react";

import "./ChatRoom.css";
import useChat from "./useChat";

const Chat = () => {
  const roomId = 1;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const messageShow = function(){
    return messages.map((message, i) => (
      <li key={i}
        className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
        {message.body}
      </li>
    ))
  }
  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">{messageShow()}</ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
