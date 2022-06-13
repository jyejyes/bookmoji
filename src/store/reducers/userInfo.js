import { USER_INFO } from "../actions/userInfo";
import { PROFILE_URL } from "../actions/userInfo";

const initialState = "";

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        nickname: action.nickname,
      };
    case PROFILE_URL:
      return {
        ...state,
        url: action.url,
      };
    default:
      return state;
  }
};
