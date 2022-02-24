import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Labels from './Labels';
import CommentSection from './CommentSection';
import ActivitySection from './ActivitySection';
import { useParams, Link } from 'react-router-dom';
import { fetchCard } from '../../../actions/CardActions';

const CardModal = () => {
  //const [cardFetched, setCardFetched] = useState(false)
  //const [selectedCard, setSelectedCard] = useState(null);
  const dispatch = useDispatch();
  const id = useParams().id;
  let selectedCard = useSelector(state => state.cards.find(card => card._id === id));
  const list = useSelector(state => state.lists.find(list => list._id === selectedCard.listId));

  console.log("selectedCard in CardModal", selectedCard);

  useEffect(() => {
    dispatch(fetchCard(id));
  //  if (!cardFetched) {

  //  }
  }, [dispatch, id])

  const pastDue = () => {
    return Date.now() > Date.parse(selectedCard.dueDate);
  };

  const parseDueDate = () => {
    const dateString = moment(selectedCard.dueDate).format('MMM Do');
    const timeString = moment(selectedCard.dueDate).format('h:mm A');
    return `${dateString} at ${timeString} ${pastDue() ? '(past due)' : ''}`;
  };

  const dueDateClass = () => {
    let className = '';
    if (selectedCard.completed) {
      className += 'completed ';
    }
    if (pastDue()) {
      className += 'overdue';
    }
    return className;
  }

  if (!selectedCard) {
    return null;
  } else {
    return (
      <div id="modal-container">
        <Link to={`/boards/${selectedCard.boardId}`} >
        <div className="screen" ></div>
        </Link>
        <div id="modal">
          <Link to={`/boards/${selectedCard.boardId}`} >
          <i className="x-icon icon close-modal" ></i>
          </Link>
          <header>
            <i className="card-icon icon .close-modal"></i>
            <textarea className="list-title" style={{ height: "45px" }} defaultValue={selectedCard.title} />
            <p>
              in list <a className="link">{list ? list.title : ''}</a>
              <i className="sub-icon sm-icon"></i>
            </p>
          </header>
          <section className="modal-main">
            <ul className="modal-outer-list">
              <li className="details-section">
                <ul className="modal-details-list">
                  <Labels labels={selectedCard.labels} />
                  <li className="due-date-section">
                    <h3>Due Date</h3>
                    <div id="dueDateDisplay" className={dueDateClass()}>
                      <input
                        id="dueDateCheckbox"
                        type="checkbox"
                        className="checkbox"
                        defaultChecked=""
                      />
                      {parseDueDate()}
                    </div>
                  </li>
                </ul>
                <form className="description">
                  <p>Description</p>
                  <span id="description-edit" className="link">
                    Edit
                  </span>
                  <p className="textarea-overlay">
                    {selectedCard.description}
                  </p>
                  <p id="description-edit-options" className="hidden">
                    You have unsaved edits on this field.{" "}
                    <span className="link">View edits</span> -{" "}
                    <span className="link">Discard</span>
                  </p>
                </form>
              </li>
              <CommentSection  />
              <ActivitySection selectedCard={selectedCard} />
            </ul>
          </section>
          <aside className="modal-buttons">
            <h2>Add</h2>
            <ul>
              <li className="member-button">
                <i className="person-icon sm-icon"></i>Members
              </li>
              <li className="label-button">
                <i className="label-icon sm-icon"></i>Labels
              </li>
              <li className="checklist-button">
                <i className="checklist-icon sm-icon"></i>Checklist
              </li>
              <li className="date-button not-implemented">
                <i className="clock-icon sm-icon"></i>Due Date
              </li>
              <li className="attachment-button not-implemented">
                <i className="attachment-icon sm-icon"></i>Attachment
              </li>
            </ul>
            <h2>Actions</h2>
            <ul>
              <li className="move-button">
                <i className="forward-icon sm-icon"></i>Move
              </li>
              <li className="copy-button">
                <i className="card-icon sm-icon"></i>Copy
              </li>
              <li className="subscribe-button">
                <i className="sub-icon sm-icon"></i>Subscribe
                <i className="check-icon sm-icon"></i>
              </li>
              <hr />
              <li className="archive-button">
                <i className="file-icon sm-icon "></i>Archive
              </li>
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Share and more...</li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }
};

export default CardModal;

/*
in card model fetch card

in singleboard functino to get boardid
  will be from url or from card.baordid

  in single baord useeffect
    in !board id
      return
    else
      fetch board

*/
