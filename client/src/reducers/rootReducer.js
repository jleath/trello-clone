import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";
import cards from "./cards";
import selectedCard from "./selectedCard";

const rootReducer = combineReducers({ boards, lists, cards, selectedCard });

export default rootReducer;
