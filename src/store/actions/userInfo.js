export const USER_INFO = "userInfo/USER_INFO";
export const PROFILE_URL = "userInfo/PROFILE_URL";

export const userInfo = (nickname) => ({
  type: USER_INFO,
  nickname,
});

export const profileUrl = (url) => ({
  type: PROFILE_URL,
  url,
});
