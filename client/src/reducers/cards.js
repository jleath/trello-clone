import * as types from "../constants/ActionTypes";

export default function cards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return [
        ...state,
        ...action.board.lists
          .flatMap(list => list.cards)
          .filter(card => !state.some(c => c._id === card._id))
      ];
    }
    case types.FETCH_CARD_SUCCESS: {
      const card = state.find(c => c._id === action.card._id);
      if (!card) {
        return [ ...state, action.card ];
      }
      const result = state.map(c => {
        if (c._id === action.card._id) {
          return action.card;
        } else {
          return c;
        }
      });
      return result;
    }
    case types.CREATE_CARD_SUCCESS: {
      console.log(action.card);
      return [ ...state, action.card ];
    }
    default: {
      return state;
    }
  }
}
