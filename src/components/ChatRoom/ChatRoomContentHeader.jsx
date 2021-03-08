import React from "react";
import "./ChatRoomContentHeader.css";
import PropTypes from "prop-types";

const ChatRoomContentHeader = ({ currentUserName, userNamesList, name }) => {
  return (
    <div className="ChatRoomContentHeader">
      <h1 className="ChatRoomContentHeader-title">{name}</h1>
      <div>
        <span className="ChatRoomContentHeader-current">
          {currentUserName} ,
        </span>

        <span>
          {userNamesList &&
            userNamesList.filter((name) => name !== currentUserName).join(", ")}
        </span>
      </div>
    </div>
  );
};

ChatRoomContentHeader.propTypes = {
  currentUserName: PropTypes.string,
  userNamesList: PropTypes.array,
  name: PropTypes.string,
};
export default ChatRoomContentHeader;
