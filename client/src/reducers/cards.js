import * as types from "../constants/ActionTypes"; 

export default function cards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return action.board.lists.reduce((accumulator, list) => {
        return accumulator.concat(list.cards)
      }, [])
    }
    default: {
      return state;
    } 
  }
}