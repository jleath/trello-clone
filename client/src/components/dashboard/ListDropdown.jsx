import React from "react";
import ListTitle from './ListTitle';

const ListDropdown = ({ list}) => {
  return (
    <>
      <a className="more-icon sm-icon" href=""></a>
      <ListTitle list={list} />
      <div className="add-dropdown add-top">
        <div className="card"></div>
        <a className="button">Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
    </>
  );
};

export default ListDropdown;