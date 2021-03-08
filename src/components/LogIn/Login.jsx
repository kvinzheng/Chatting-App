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

  return (
    <div className="Login">
      <form className="Login-content" onSubmit={handleSubmit}>
        <InputBox
          name="username"
          className="Login-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Type your username..."
        />
        <button className="Login-button-submit">Join the Chat!</button>
      </form>
    </div>
  );
};

export const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, { userLogin })(Login);
