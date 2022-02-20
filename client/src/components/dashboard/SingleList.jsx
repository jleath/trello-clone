import React, { useState } from "react";
import ListDropdown from './ListDropdown';
import Cards from './Cards';
import NewCard from './NewCard';

const SingleList = ({ list }) => {
  const [ focus, setFocus ] = useState(false);

  const toggleFocus = e => {
    e.preventDefault();
    setFocus(!focus);
  };

  return (
    <div className={focus ? 'list-wrapper add-dropdown-active' : 'list-wrapper'}>
      <div className="list-background">
        <div className="list">
          <ListDropdown listTitle={list.title} />
          <Cards listId={list._id}/>
          <NewCard onFocusToggle={toggleFocus}/>  
        </div>
      </div>
    </div>
  );
};

export default SingleList;
