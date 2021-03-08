import React from "react";
import { fetchSingleRoom } from "../../actions/room";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./LeftNavRoomList.css";

const LeftNavRoomList = ({ rooms, activeRoom, fetchSingleRoom }) => {
  return (
    <div className="LeftNavRoomList">
      {rooms.map((ele, index) => {
        const active = ele.name === activeRoom.name ? "active" : "";
        const urlName =
          activeRoom.name !== undefined
            ? activeRoom.name.split(" ").join("_")
            : "";
        return (
          <Link
            to={`/chat-rooms/${urlName}`}
            key={index}
            className={`LeftNavRoomList-item ${active}`}
            onClick={() => fetchSingleRoom(ele.id)}
          >
            {ele.name}
          </Link>
        );
      })}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.data,
    activeRoom: state.rooms.active,
  };
};

export default connect(mapStateToProps, { fetchSingleRoom })(LeftNavRoomList);
