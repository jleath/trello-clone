import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoard, fetchBoards } from "../../actions/BoardActions";
import Lists from './Lists';
import Header from './Header';
import MenuSidebar from './MenuSidebar';

const SingleBoard = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const getBoardId = (id, cards) => {    
   
    if (location.pathname.includes("boards")) {
      return id
    } else {
      console.log("getBoard", cards)
      const card = cards.find(c => c._id === id)
      if (card) {
        return card.boardId;
      }
    }
    return null;
  }

  
  const cards = useSelector(state => state.cards);
  console.log("cards undefined", cards)
  const id = getBoardId(useParams().id, cards);
  const board = useSelector(state => state.boards.find(board => board._id === id));
  console.log('Rerendering singleboard')

  console.log('Cards:', cards)

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
    } else {

      console.log('I do nothing!')
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

export default SingleBoard;
