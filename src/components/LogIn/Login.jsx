import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import InputBox from "../../common/InputBox";
import { userLogin } from "../../actions/user";
import "./Login.css";

export const Login = ({ userLogin }) => {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) return;
    userLogin(username);
    history.push("/chat-rooms");
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div className="Login">
      <div className="Login-content">
        <InputBox
          name="username"
          className="Login-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Type your username..."
          onKeyDown={handleEnterKeyDown}
        />
        <button className="Login-button-submit" onClick={handleSubmit}>
          Join the Chat!
        </button>
      </div>
    </div>
  );
};

export const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { userLogin })(Login);
