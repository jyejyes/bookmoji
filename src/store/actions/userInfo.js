export const USER_INFO = "userInfo/USER_INFO";

export const userInfo = (nickname) => ({
  type: USER_INFO,
  nickname,
});
