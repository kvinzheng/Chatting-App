import React from "react";
import LeftNav from "../LeftNav/index";
import ChatRoomWrapper from "../ChatRoom/ChatRoomWrapper"
import "./index.css";


const ChatRoom = () => (
  <div className="ChatRoom">
    <LeftNav />
    <ChatRoomWrapper />
  </div>
);

export default ChatRoom;
