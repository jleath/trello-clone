import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListSuccess(newList) {
  return {
    type: types.CREATE_LIST_SUCCESS,
    newList
  };
}

export function updateListSuccess(patchedList) {
  return {
    type: types.UPDATE_LIST_SUCCESS,
    patchedList,
  };
}

export function createList(boardId, listTitle, callback) {
  return function(dispatch) {
    apiClient.createList(boardId, listTitle, data => {
      dispatch(createListSuccess(data.newList));
      if (callback) { 
        callback(data.newList);
      }
    });
  };
}

export function updateList(listId, title, position) {
  return function(dispatch) {
    apiClient.updateList(listId, title, position, data => {
      dispatch(updateListSuccess(data.patchedList));
    });
  };
}
