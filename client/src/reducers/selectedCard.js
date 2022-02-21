import * as types from "../constants/ActionTypes"; 

export default function selectedCard(state = {}, action) {
  switch (action.type) {
    case types.SELECT_CARD: {
      return action.selectedCard;
    }
    default: {
      return state;
    } 
  }
}