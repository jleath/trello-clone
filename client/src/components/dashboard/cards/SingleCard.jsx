import React from "react";

import { Link } from "react-router-dom";

const SingleCard = ({card}) => {
  return (
    <div className="card-background">
      <Link to={`/cards/${card._id}`} >
      <div className="card" >
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          <div className="card-label green colorblindable"></div>
          <div className="card-label yellow colorblindable"></div>
          <div className="card-label red colorblindable"></div>
          <div className="card-label orange colorblindable"></div>
          <div className="card-label blue colorblindable"></div>
          <div className="card-label purple colorblindable"></div>
          <p>
            {card.description}
          </p>
        </div>
        <div className="card-icons">
          <i className="clock-icon sm-icon overdue-recent completed">
            {
              new Date(card.dueDate).toLocaleDateString()
            }
          </i>
          <i className="description-icon sm-icon"></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default SingleCard;
