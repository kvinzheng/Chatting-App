import { messagesState } from "../reducers/state";
import {
  FETCH_ROOM_MESSAGES_PENDING,
  FETCH_ROOM_MESSAGES_FULFILLED,
  FETCH_ROOM_MESSAGES_REJECTED,
  POST_ROOM_MESSAGES,
} from "../actions/type";

const messages = (state = messagesState, { type, payload }) => {
  switch (type) {
    case FETCH_ROOM_MESSAGES_PENDING:
      return {
        ...state,
      };
    case FETCH_ROOM_MESSAGES_FULFILLED:
      return {
        ...state,
        [payload.id]: payload.data,
      };
    case FETCH_ROOM_MESSAGES_REJECTED:
      return {
        ...state,
      };
    case POST_ROOM_MESSAGES:
      const originalMessage = state[payload.id];
      return {
        ...state,
        [payload.id]: [...originalMessage, payload.data],
      };
    default:
      return state;
  }
};

export default messages;
