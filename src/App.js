import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/LogIn/Login";
import ChatHome from "../src/components/ChatRoom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/chat-rooms">
          <ChatHome />
        </Route>
        <Route exact path="/chat-rooms/:name">
          <ChatHome />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
