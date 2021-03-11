import React, { memo } from "react";
import { connect } from "react-redux";

import LeftNavHeader from "./LeftNavHeader";
import LeftNavRoomList from "./LeftNavRoomList.jsx";

import "./index.css";

const LeftNav = memo(({ currentUser }) => {
  return (
    <div className="LeftNav">
      <div className="LeftNav-Header">
        <LeftNavHeader username={currentUser.username} />
      </div>

      <LeftNavRoomList />
    </div>
  );
});

export const mapStateToProps = (state) => {
  return {
    currentUser: state.users,
  };
};

export default connect(mapStateToProps, {})(LeftNav);
