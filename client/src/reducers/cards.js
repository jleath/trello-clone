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

      //let newState = [];
      //const existingIds = state.map(card => card._id);
      //action.board.lists.forEach(list => {
      //  list.cards.forEach(card => {
      //    if (!existingIds.includes(card._id)) {
      //      newState = [ ...newState, card ];
      //    }
      //  });
      //});
      //return [ ...state, ...newState ];
    }
    case types.FETCH_CARD_SUCCESS: {
      //console.log("action.card", action.card);
      const card = state.find(c => c._id === action.card._id);
      //console.log("card in fetch_card_success", card);
      if (!card) {
        return state.concat(action.card);
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
    default: {
      return state;
    }
  }
}
