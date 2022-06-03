import { combineReducers } from "redux";
import { selectedReducer } from "./reducers/selected";
import { recentSearchReducer } from "./reducers/recentSearch";

const rootReducer = combineReducers({ selectedReducer, recentSearchReducer });

export default rootReducer;
