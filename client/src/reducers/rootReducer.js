import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";
import cards from "./cards";
import singleCard from "./singleCard";

const rootReducer = combineReducers({ boards, lists, cards, singleCard });

export default rootReducer;
