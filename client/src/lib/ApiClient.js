import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(id, callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL + `/${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, {board})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(boardId, listTitle, callback) {
    const payload = {
      boardId,
      list: {
        title: listTitle
      }
    };
    return axios
      .post(routes.CREATE_LIST_URL, payload)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(listId, newTitle, listPosition, callback) {
    const payload = {
      title: newTitle,
      position: listPosition,
    };
    return axios
      .patch(`${routes.EDIT_LIST_URL}/${listId}`, payload)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
  fetchCard: function(cardId, callback) {
    return axios
      .get(`${routes.FETCH_CARD_URL}/${cardId}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError)
  },
};

export default apiClient;
