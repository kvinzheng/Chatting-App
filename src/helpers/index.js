import { ONE_MINUTE } from "../consts";

export const getOnlineMinute = (startTime, currentTime) => {
  const timeInterval = currentTime - startTime;
  return Math.ceil(timeInterval / ONE_MINUTE);
};
