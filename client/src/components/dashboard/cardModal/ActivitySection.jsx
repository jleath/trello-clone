import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Comment = ({ comment }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member">VR</div>
      </div>
      <h3>Victor Reyes</h3>
      <div className="comment static-comment">
        <span>{comment.title}</span>
      </div>
      <small>
        22 minutes ago - <span className="link">Edit</span> -{" "}
        <span className="link">Delete</span>
      </small>
      <div className="comment">
        <label>
          <textarea required="" rows="1" defaultValue="The activities have not been implemented yet."/>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              defaultValue="Save"
            />
            <i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </li>
  );
};

const Action = ({ action }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member small-size">VR</div>
      </div>
      <p>
        <span className="member-name">Victor Reyes</span>
        {" " + action.description}<small>yesterday at 4:53 PM</small>
      </p>
    </li>
  );
};

const ActivitySection = ({ selectedCard }) => {
  const { comments, actions } = selectedCard;
  const chimera = [ ...comments, ...actions ];

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">
        {
          chimera.map(c =>
            !c.description
              ? <Comment key={c._id} comment={c} />
              : <Action key={c._id} action={c} />
          )
        }
      </ul>
    </li>
  );
};

export default ActivitySection;
