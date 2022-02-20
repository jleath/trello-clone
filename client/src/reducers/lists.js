import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return action.board.lists;
    }
    case types.CREATE_LIST_SUCCESS: {
      return [ ...state, action.newList ];
    }
    default: {
      return state;
    }
  }
}
