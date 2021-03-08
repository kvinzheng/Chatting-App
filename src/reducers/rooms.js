import {
  FETCH_ROOMS_PENDING,
  FETCH_ROOMS_FULFILLED,
  FETCH_ROOMS_REJECTED,
  FETCH_ROOM_DETAIL_PENDING,
  FETCH_ROOM_DETAIL_FULFILLED,
  FETCH_ROOM_DETAIL_REJECTED,
  UPDATE_ACTIVE_USER,
} from "../actions/type";
import { roomsState } from "./state";
import { cloneDeep } from "lodash";

const rooms = (state = roomsState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_PENDING:
      return {
        ...state,
        status: "pending",
      };
    case FETCH_ROOMS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        status: "fulfilled",
      };
    case FETCH_ROOMS_REJECTED:
      return {
        ...state,
        status: "rejected",
      };
    case FETCH_ROOM_DETAIL_PENDING:
      return {
        ...state,
        status: "pending",
      };
    case FETCH_ROOM_DETAIL_FULFILLED:
      return {
        ...state,
        active: action.payload,
        status: "fulfilled",
      };
    case FETCH_ROOM_DETAIL_REJECTED:
      return {
        ...state,
        status: "rejected",
      };
    case UPDATE_ACTIVE_USER:
      const newActive = cloneDeep(state.active);
      newActive.users = action.payload;
      return {
        ...state,
        active: newActive,
      };
    default:
      return state;
  }
};

export default rooms;
