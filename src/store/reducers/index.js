import { combineReducers } from "redux";
import { selectedReducer } from "./selected";
import { recentSearchReducer } from "./recentSearch";

const rootReducer = combineReducers({ selectedReducer, recentSearchReducer });

export default rootReducer;
