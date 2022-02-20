import React from "react";

const ListDropdown = ({ listTitle }) => {
  return (
    <>
      <a className="more-icon sm-icon" href=""></a>
      <div>
        <p className="list-title">{listTitle}</p>
      </div>
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