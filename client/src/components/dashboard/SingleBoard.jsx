import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoard, fetchBoards } from "../../actions/BoardActions";
import Lists from './Lists';
import Header from './Header';
import MenuSidebar from './MenuSidebar';

const SingleBoard = () => {
  const dispatch = useDispatch()
  const id = useParams().id;
  const board = useSelector(state => state.boards.find(board => board._id === id));
  const boards = useSelector(state => state.boards)

  useEffect(() => {
    dispatch(fetchBoard(id));
    if (!boards || boards.length === 0) {
      dispatch(fetchBoards())
    }
  }, [dispatch, boards, id])

  if (!board) {
    return null;
  } else {
    return (
      <>
        <Header board={board}/>
        <Lists boardId={board._id} />
        <MenuSidebar />
        <div id="modal-container"></div>
        <div id="dropdown-container"></div>
      </>
    );
  }
};

export default SingleBoard;
