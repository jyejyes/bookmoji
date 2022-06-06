import { combineReducers } from "redux";
import { selectedReducer } from "./selected";
import { recentSearchReducer } from "./recentSearch";
import { userInfoReducer } from "./userInfo";

const rootReducer = combineReducers({
  selectedReducer,
  recentSearchReducer,
  userInfoReducer,
});

export default rootReducer;
