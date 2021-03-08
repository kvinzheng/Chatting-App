import {
  FETCH_ROOM_MESSAGES_PENDING,
  FETCH_ROOM_MESSAGES_FULFILLED,
  FETCH_ROOM_MESSAGES_REJECTED,
  POST_ROOM_MESSAGES,
} from "./type";
import baseUrl from "../api/baseUrl";

export const fetchSingleRoomMessages = (id) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ROOM_MESSAGES_PENDING,
    });
    try {
      const { data } = await baseUrl.get(`/rooms/${id}/messages`);
      dispatch({
        type: FETCH_ROOM_MESSAGES_FULFILLED,
        payload: {
          id,
          data: data,
        },
      });
    } catch (e) {
      dispatch({
        type: FETCH_ROOM_MESSAGES_REJECTED,
      });
    }
  };
};

export const postMessageSingleRoom = (id, message) => {
  return {
    type: POST_ROOM_MESSAGES,
    payload: {
      id,
      data: message,
    },
  };
};
