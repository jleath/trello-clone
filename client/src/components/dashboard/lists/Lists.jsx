import React from 'react';
import { useSelector } from 'react-redux';
import SingleList from './SingleList';
import NewList from './NewList';

const Lists =({ boardId }) => {
  const lists = useSelector(state => state.lists);

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map(list => <SingleList key={list._id} list={list} />)}
        </div>
        <NewList boardId={boardId} />
      </div>
    </main>
  );
};

export default Lists;