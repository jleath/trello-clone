import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchCardSuccess(card) {
  return {
    type: types.FETCH_CARD_SUCCESS,
    card
  };
}

export function createCardSuccess(card) {
  return {
    type: types.CREATE_CARD_SUCCESS,
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

export function createCard(listId, cardName, callback) {
  return function(dispatch) {
    apiClient.createCard(listId, cardName, data => {
      dispatch(createCardSuccess(data));
      if (callback) {
        callback();
      }
    });
  };
}