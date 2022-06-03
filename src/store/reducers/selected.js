import { SELECTED_EMOJI, SELECTED_TEXT } from "../actions/selected";

const initialState = "";

export const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_EMOJI:
      return {
        ...state,
        emoji: action.emoji,
      };
    case SELECTED_TEXT:
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};
