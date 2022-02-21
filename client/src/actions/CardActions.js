import * as types from "../constants/ActionTypes";

export const selectCard = selectedCard => {
  return {
    type: types.SELECT_CARD,
    selectedCard,
  };
};

