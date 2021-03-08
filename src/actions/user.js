import { LOGIN } from "./type";

export const userLogin = (username) => {
  return {
    type: LOGIN,
    payload: { username, startTime: new Date() },
  };
};
