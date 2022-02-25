import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCard } from '../../../actions/CardActions';

const NewCard = ({ onFocusToggle, listId }) => {
  const [ cardNameInput, setCardNameInput ] = useState('');
  const dispatch = useDispatch();

  const handleNewCardSubmit = (e) => {
    e.preventDefault();
    dispatch(createCard(listId, cardNameInput));
    onFocusToggle(e);
  };

  return (
    <>
      <div className="add-dropdown add-bottom active-card">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" value={cardNameInput} 
                    onChange={e => setCardNameInput(e.target.value)}/>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleNewCardSubmit}>Add</a>
        <i className="x-icon icon" onClick={onFocusToggle}></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom" onClick={onFocusToggle}>
        Add a card...
      </div>
    </>
  );
};

export default NewCard;