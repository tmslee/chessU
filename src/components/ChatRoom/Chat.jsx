import React, {useState} from "react";

import "./ChatRoom.css";
import useChat from "../../hooks/chat";

import { Button } from 'react-bootstrap';

const Chat = (props) => {
  const roomId = props.roomId;
  const { messages, sendMessage } = useChat(roomId);
  const { setPopUp } = props;
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
      <div class="text-send">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <Button onClick={handleSendMessage} variant="outline-success">Send</Button>
      </div>
    </div>
  );
};

export default Chat;
