import * as types from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      return action.board.lists;
    }
    case types.CREATE_LIST_SUCCESS: {
      return [ ...state, action.newList ];
    }
    case types.UPDATE_LIST_SUCCESS: {
      return state.map(list => {
        if (list._id !== action.patchedList._id) {
          return list
        } else {
          return {
            ...list,
            title: action.patchedList.title,
            position: action.patchedList.position,
          };
        }
      });
    }
    default: {
      return state;
    }
  }
}
