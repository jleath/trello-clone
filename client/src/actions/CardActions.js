import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardSuccess(cardId) {
  return {
    type: types.FETCH_CARD_SUCCESS,
    cardId
  };
}

export function fetchCard(cardId) {
  return function(dispatch) {
    apiClient.fetchCard(cardId, data => {
      dispatch(fetchCardSuccess(data.card));
    });
  };
}