/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchRooms } from "../../actions/room";
import ChatRoomContent from "./ChatRoomContent";
import PropTypes from "prop-types";

import "./ChatRoomWrapper.css";

const ChatRoomWrapper = ({ history, currentUser, fetchRooms }) => {
  if (!currentUser.login) {
    history.push("/");
  }
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="ChatRoomWrapper">
      <ChatRoomContent currentUserName={currentUser.username} />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentUser: state.users,
  };
};

ChatRoomWrapper.propTypes = {
  currentUser: PropTypes.object,
  fetchRooms: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, { fetchRooms })(
  withRouter(ChatRoomWrapper)
);
