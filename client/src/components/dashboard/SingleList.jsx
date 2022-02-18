import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleCard from "./SingleCard";

const SingleList = ({ list }) => {
  const tempCards = useSelector(state => state.cards)
  const cards = tempCards.filter(card => list._id === card.listId);
  const [ focus, setFocus ] = useState(false);
  console.log('Cards: ', cards)

  const generateListWrapperClass = () => {
    if (focus) {
      return "list-wrapper add-dropdown-active";
    }
    return "list-wrapper";
  };

  const toggleFocus = e => {
    e.preventDefault();
    setFocus(!focus);
  };

  return (
    <div className={generateListWrapperClass()}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <p className="list-title">{list.title}</p>
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card => <SingleCard key={card._id} card={card} />)}
          </div>
          <div className="add-dropdown add-bottom active-card">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a
              className="button"
              onClick={toggleFocus}
            >
              Add
            </a>
            <i
              className="x-icon icon"
              onClick={toggleFocus}
            >
            </i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div
            className="add-card-toggle"
            data-position="bottom"
            onClick={toggleFocus}
          >
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleList;
