import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardSuccess(card) {
  return {
    type: types.FETCH_CARD_SUCCESS,
    card
  };
}

export function fetchCard(cardId, callback) {
  return function(dispatch) {
    apiClient.fetchCard(cardId, data => {
      dispatch(fetchCardSuccess(data));
      if (callback) {
        callback();
      }
    });
  };
}