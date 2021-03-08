import messages from "./messages";
import { messagesState } from "./state";
import {
  FETCH_ROOM_MESSAGES_PENDING,
  FETCH_ROOM_MESSAGES_FULFILLED,
  FETCH_ROOM_MESSAGES_REJECTED,
  POST_ROOM_MESSAGES,
} from "../actions/type";

describe("messages data", () => {
  it("returns an the default state if passed in state that is undefined", () => {
    const nextState = messages(undefined, {});
    expect(nextState).toEqual(messagesState);
  });

  it("returns the exact state given an unkown type (i.e., does not modify the state)", () => {
    const prevState = { ...messagesState };
    const nextState = messages(prevState, { type: "UNKNOWN" });
    expect(nextState).toBe(prevState);
  });

  it("FULFILLED: return a new state with the specified messages data on it- get message", () => {
    const incomingApiData = [{}, {}];
    const prevState = { ...messagesState };
    const nextState = messages(prevState, {
      type: FETCH_ROOM_MESSAGES_FULFILLED,
      payload: { id: 0, data: incomingApiData },
    });

    expect(nextState).not.toBe(prevState);
    expect(nextState).toEqual({ 0: incomingApiData });
  });

  it("REJECTED: return a new state with the specified messages data on it- get message", () => {
    const prevState = { ...messagesState };
    const nextState = messages(prevState, {
      type: FETCH_ROOM_MESSAGES_REJECTED,
    });

    expect(nextState).not.toBe(prevState);
    expect(nextState).toEqual({});
  });

  it("PENDING: return a new state with the specified messages data on it- get message", () => {
    const prevState = { ...messagesState };
    const nextState = messages(prevState, {
      type: FETCH_ROOM_MESSAGES_PENDING,
    });

    expect(nextState).not.toBe(prevState);
    expect(nextState).toEqual({});
  });
});
