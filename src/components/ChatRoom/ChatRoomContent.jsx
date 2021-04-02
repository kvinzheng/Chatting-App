/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import PropTypes from "prop-types";

import InputBox from "../../common/InputBox";
import Message from "../../common/Message";
import ChatRoomContentHeader from "./ChatRoomContentHeader";
import { fetchSingleRoom, updateActiveUsers } from "../../actions/room";
import amqp from "amqplib/callback_api";

import {
  postMessageSingleRoom,
  fetchSingleRoomMessages,
} from "../../actions/message";

import "./ChatRoomContent.css";

import { SCROLL_OPTIONS, NEW_CHAT_MESSAGE, SERVER_HOST } from "../../consts";

export const ChatRoomContent = ({
  currentUserName,
  postMessageSingleRoom,
  fetchSingleRoom,
  fetchSingleRoomMessages,
  messagesDetail,
  activeRoom,
  updateActiveUsers,
}) => {
  const [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputBoxRef = useRef();
  const activeRoomId = activeRoom.id;

  const messagesList = messagesDetail[activeRoomId] || [];

  const createSocketIO = () => {
    const socket = socketIOClient(SERVER_HOST, {
      query: { roomId: activeRoomId, user: currentUserName },
    });
    socket.on(NEW_CHAT_MESSAGE, ({ message, room, queue }) => {
      const newactiveUsers = room.users;
      //server side event
      // let eventSource = new EventSource("http://localhost:8080/stream");
      // eventSource.onmessage = (e) => {
      //   console.log("e data", e.data);
      // };
      updateActiveUsers(newactiveUsers);
      postMessageSingleRoom(activeRoomId, message);
    });
    return socket;
  };

  //create socket when id change
  useEffect(() => {
    const fetApi = async () => {
      await Promise.all([
        fetchSingleRoom(activeRoomId),
        fetchSingleRoomMessages(activeRoomId),
      ]);
    };
    fetApi();

    const newSocket = createSocketIO();
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [activeRoomId]);

  //scroll to the inputbox
  useEffect(() => {
    inputBoxRef.current.scrollIntoView(SCROLL_OPTIONS);
  }, [messagesList.length]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit(NEW_CHAT_MESSAGE, inputValue);
    setInputValue("");
  };
  // optimization
  const activeRoomUser = useMemo(() => {
    return activeRoom.users;
  }, [activeRoom.users.join("_")]);

  return (
    <div className="ChatRoomContent">
      <ChatRoomContentHeader
        currentUserName={currentUserName}
        userNamesList={activeRoomUser}
        name={activeRoom.name}
      />

      <div className="ChatRoomContent-messages">
        {messagesList.map(({ name, message }, index) => {
          return (
            <Message
              myself={name === currentUserName}
              author={name}
              key={index}
            >
              {message}
            </Message>
          );
        })}
        <div className="ChatRoomScroll" ref={inputBoxRef} />
      </div>
      <form
        className="ChatRoomContent-inputBoxWrapper"
        onSubmit={handleMessageSubmit}
      >
        <InputBox
          placeholder="Type a message..."
          name="message-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="link"
          className="ChatRoomContent-submitButton"
          onClick={handleMessageSubmit}
        >
          Send
        </button>
      </form>
    </div>
  );
};
export const mapStateToProps = (state) => {
  return {
    messagesDetail: state.messages,
    rooms: state.rooms.data,
    activeRoom: state.rooms.active,
  };
};

ChatRoomContent.propTypes = {
  messagesDetail: PropTypes.object,
  rooms: PropTypes.array,
  activeRoom: PropTypes.object,
  updateActiveUsers: PropTypes.func,
};
export default connect(mapStateToProps, {
  postMessageSingleRoom,
  fetchSingleRoom,
  fetchSingleRoomMessages,
  updateActiveUsers,
})(ChatRoomContent);
