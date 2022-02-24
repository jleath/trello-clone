import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARDS_SUCCESS: {
      return action.boards;
    }
    case types.CREATE_BOARD_SUCCESS: {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case types.FETCH_BOARD_SUCCESS: {
      if (state.find(b => b._id === action.board._id )) {
        return state;
      }
      return state.concat(action.board);
    }
    default:
      return state;
  }
}
