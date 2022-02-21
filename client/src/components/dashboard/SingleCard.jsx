import React from "react";
import { useDispatch } from 'react-redux';
import { selectCard } from '../../actions/CardActions';

const SingleCard = ({card}) => {
  const dispatch = useDispatch();

  const handleCardClick = e => {
    e.preventDefault();
    dispatch(selectCard(card));
  }

  return (
    <div className="card-background">
      <div className="card" onClick={handleCardClick}>
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
    </div>
  );
};

export default SingleCard;
