import * as types from "../constants/ActionTypes"; 

export default function lists(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return action.board.lists;
    }
    default: {
      return state;
    } 
  }
}