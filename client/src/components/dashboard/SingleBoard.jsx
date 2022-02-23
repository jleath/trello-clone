import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import Lists from './lists/Lists';
import Header from './Header';
import MenuSidebar from './MenuSidebar';

const SingleBoard = () => {
  const location = useLocation();
  const cards = useSelector(state => state.cards);
  const id = getBoardId(useParams().id, cards, location);
  const board = useSelector(state => state.boards.find(board => board._id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
    }    
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

function getBoardId(id, cards, location) {  
  if (location.pathname.includes("boards")) {
    return id
  } else {
    const card = cards.find(c => c._id === id)
    if (card) {
      return card.boardId;
    }
  }
  return null;
}

export default SingleBoard;
