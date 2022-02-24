import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from "../../../actions/ListActions";

const NewList = ({ boardId }) => {
  const [ newListActive, setNewListActive ] = useState(false);
  const [ title, setTitle ] = useState('');
  const dispatch = useDispatch();

  const handleNewListSubmit = e => {
    e.preventDefault();
    if (title) {
      dispatch(createList(boardId, title));
      toggleActive(e);
      setTitle('');
    }
  };

  const toggleActive = e => {
    e.preventDefault();
    setNewListActive(!newListActive);
  };

  return (
    <div id="new-list" className={newListActive ? 'new-list selected' : 'new-list'}>
      <span onClick={toggleActive}>
        Add a list...
      </span>
      <input type="text" placeholder="Add a list..." value={title}
             onChange={e => setTitle(e.target.value)}/>
      <div>
        <input type="submit" className="button" value="Save"
               onClick={handleNewListSubmit}/>
        <i className="x-icon icon" onClick={toggleActive}></i>
      </div>
    </div>
  );
};

export default NewList;