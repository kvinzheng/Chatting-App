import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import InputBox from "../../common/InputBox";
import Message from "../../common/Message";
import ChatRoomContentHeader from "./ChatRoomContentHeader";
import { fetchSingleRoom, updateActiveUsers } from "../../actions/room";
import {
  postMessageSingleRoom,
  fetchSingleRoomMessages,
} from "../../actions/message";

import "./ChatRoomContent.css";

import { SCROLL_OPTIONS, NEW_CHAT_MESSAGE, SERVER_HOST } from "../../consts";

export const ChatRoomContent = memo(
  ({ currentUserName }) => {
    const [socket, setSocket] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const inputBoxRef = useRef();

    const activeRoom = useSelector((state) => state.rooms.active);
    const messagesDetail = useSelector((state) => state.messages);
    const activeRoomId = activeRoom.id;
    const messagesList = messagesDetail[activeRoomId] || [];
    console.log("render", activeRoomId);
    const dispatch = useDispatch();

    const postMessageSingleRoomCallBack = useCallback(
      (activeRoomId, message) => dispatch(postMessageSingleRoom(activeRoomId, message)),
      [activeRoomId]
    );
    const fetchSingleRoomCallBack = useCallback(
      (activeRoomId) => {
        dispatch(fetchSingleRoom(activeRoomId));
      },
      [activeRoomId]
    );
    const fetchSingleRoomMessagesCallBack = useCallback(
      (activeRoomId) => {
        dispatch(fetchSingleRoomMessages(activeRoomId))
      },
      [activeRoomId]
    );
    const createSocketIO = () => {
      const socket = socketIOClient(SERVER_HOST, {
        query: { roomId: activeRoomId, user: currentUserName },
      });
      socket.on(NEW_CHAT_MESSAGE, ({ message, room }) => {
        const newactiveUsers = room.users;

        dispatch(updateActiveUsers(newactiveUsers));
        postMessageSingleRoomCallBack(activeRoomId, message);
      });
      return socket;
    };

    //create socket when id change
    
    useEffect(() => {
      const fetApi = async () => {
        await Promise.all([
          fetchSingleRoomCallBack(activeRoomId),
          fetchSingleRoomMessagesCallBack(activeRoomId),
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
  }
);
export const mapStateToProps = (state) => {
  return {};
};

ChatRoomContent.propTypes = {
  messagesDetail: PropTypes.object,
  rooms: PropTypes.array,
  activeRoom: PropTypes.object,
  updateActiveUsers: PropTypes.func,
};
export default connect(mapStateToProps, {
  // updateActiveUsers,
})(ChatRoomContent);
