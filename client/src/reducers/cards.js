import * as types from "../constants/ActionTypes";

export default function cards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return action.board.lists.reduce((accumulator, list) => {
        return accumulator.concat(list.cards)
      }, [])
    }
    case types.FETCH_CARD_SUCCESS: {
      console.log(action)
      const card = state.find(c => c._id === action.card._id)
      console.log("action", action.card)
      console.log(card)
      if (!card) {
        return state.concat(action.card)
      }
      return state.map(c => {
        if (c._id === action.card._id) {
          return {...action.card}
        } else {
          return c;
        }
      })
    }
    default: {
      return state;
    }
  }
}