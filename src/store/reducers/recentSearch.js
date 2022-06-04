import { filter } from "lodash";
import {
  ADD_RECENT_SEARCH,
  REMOVE_RECENT_SEARCH,
} from "../actions/recentSearch";

const initialState = [];

export const recentSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECENT_SEARCH:
      return state.concat(action.word);

    default:
      return state;
  }
};
