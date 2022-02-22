import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoard, fetchBoards } from "../../actions/BoardActions";
import Lists from './Lists';
import Header from './Header';
import MenuSidebar from './MenuSidebar';

const SingleBoard = () => {
  const dispatch = useDispatch()

  const getBoardId = (id) => {
    const location = useLocation()
    if (location.pathname.includes("board")) {
      return id
    } else {
      return useSelector(state => state.singleCard.boardId)
    }
  }

  const id = getBoardId(useParams().id);
  const board = useSelector(state => state.boards.find(board => board._id === id));

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id])

  if (!board) {
    return null;
  } else {
    return (
      <>
        <Header board={board}/>
        <Lists boardId={board._id} />
        <MenuSidebar />
        <div id="dropdown-container"></div>
      </>
    );
  }
};

export default SingleBoard;
