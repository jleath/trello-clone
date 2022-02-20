import React from 'react';

const NewCard = ({ onFocusToggle }) => {
  return (
    <>
      <div className="add-dropdown add-bottom active-card">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card"></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={onFocusToggle}>Add</a>
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