import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateList } from '../../actions/ListActions';

const ListTitle = ({ list }) => {
  const [ titleInput, setTitleInput ] = useState(list.title);
  const [ editingName, setEditingName ] = useState(false);
  const dispatch = useDispatch();

  const handleTitleChange = e => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const handleTitleUpdate = () => {
    if (titleInput) {
      dispatch(updateList(list._id, titleInput, list.position));
      setEditingName(false);
    } else {
      setTitleInput(list.title);
      setEditingName(false);
    }
  };

  const handleKeyPress = e => {
    if (e.code === 'Enter') {
      handleTitleUpdate();
    }
  };

  if (!editingName) {
    return (
      <div>
        <p className="list-title"
           onClick={() => setEditingName(!editingName)}>{titleInput}</p>
      </div>
    );
  } else {
    return (
      <div>
        <input className="list-title" onChange={handleTitleChange}
               onKeyDown={handleKeyPress} onBlur={handleTitleUpdate}
               value={titleInput} autoFocus/>
      </div>
    )
  }
};

export default ListTitle;