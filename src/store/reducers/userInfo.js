import { USER_INFO } from "../actions/userInfo";

const initialState = "";

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        nickname: action.nickname,
      };
    default:
      return state;
  }
};
