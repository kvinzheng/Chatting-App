import { LOGIN } from "../actions/type";
import { usersState } from "./state";

const users = (state = usersState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        startTime: action.payload.startTime,
        login: true,
      };
    default:
      return state;
  }
};

export default users;
