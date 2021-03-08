import {
  FETCH_ROOMS_PENDING,
  FETCH_ROOMS_FULFILLED,
  FETCH_ROOMS_REJECTED,
  FETCH_ROOM_DETAIL_PENDING,
  FETCH_ROOM_DETAIL_FULFILLED,
  FETCH_ROOM_DETAIL_REJECTED,
  UPDATE_ACTIVE_USER
} from "./type";
import baseUrl from "../api/baseUrl";

export const fetchRooms = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ROOMS_PENDING,
    });
    try {
      const { data } = await baseUrl.get("/rooms");
      dispatch({
        type: FETCH_ROOMS_FULFILLED,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_ROOMS_REJECTED,
      });
    }
  };
};

export const fetchSingleRoom = (id) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_ROOM_DETAIL_PENDING,
    });
    try {
      const { data } = await baseUrl.get(`/rooms/${id}`);
      dispatch({
        type: FETCH_ROOM_DETAIL_FULFILLED,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_ROOM_DETAIL_REJECTED,
      });
    }
  };
};


export const updateActiveUsers = (users) => {
  return {
      type: UPDATE_ACTIVE_USER,
      payload: users
  };
};
