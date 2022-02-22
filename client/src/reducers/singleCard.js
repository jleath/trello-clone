import * as types from "../constants/ActionTypes";

export default function singleCard(state = {}, action) {
  switch (action.type) {
    case types.FETCH_CARD_SUCCESS: {
      return action.card
    }
    default: {
      return state;
    }
  }
}