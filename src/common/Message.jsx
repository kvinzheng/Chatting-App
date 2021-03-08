import React from "react";
import PropTypes from "prop-types";

import "./Message.css";

const Message = ({ className, author, myself, children }) => {
  const userRoleWrapper = myself ? "Message-self" : "Message-other";
  const messageWrapper = myself ? "Message-self-body " : "Message-other-body";
  const otherUser = "Message-other-author";

  const roleDisplay = () =>
    myself ? null : <div className={otherUser}>{author}</div>;

  return (
    <div className={`${userRoleWrapper} ${className}`}>
      <div className={`Message-body ${messageWrapper}`}>{children}</div>
      {roleDisplay()}
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
  author: PropTypes.string,
  myself: PropTypes.bool,
  children: PropTypes.string,
};

Message.defaultProps = {
  className: "",
};
export default Message;
