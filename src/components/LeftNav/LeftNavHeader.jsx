import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getOnlineMinute } from "../../helpers";
import { ONE_MINUTE } from "../../consts";
import "./LeftNavHeader.css";

const LeftNavHeader = ({ currentUser }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const minutesOnline = getOnlineMinute(currentUser.startTime, currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="LeftNavHeader">
      <div>
        <span>{currentUser.username}</span>
      </div>
      <div>
        <span className="LeftNavHeader-online">
          Online for {minutesOnline} minutes
        </span>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentUser: state.users,
  };
};

export default connect(mapStateToProps, {})(LeftNavHeader);
