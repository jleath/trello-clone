import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard, fetchBoards } from "../../actions/BoardActions";
import { createList } from "../../actions/ListActions";
import SingleList from "./SingleList";

const Header = ({ board }) => {
  return(
    <header>
      <ul>
        <li id="title">{board.title}</li>
        <li className="star-icon icon"></li>
        <li className="private private-icon icon">Private</li>
      </ul>
      <div className="menu">
        <i className="more-icon sm-icon"></i>Show Menu
      </div>
      <div className="subscribed">
        <i className="sub-icon sm-icon"></i>Subscribed
      </div>
    </header>
  )
};

const Main = ({ lists, boardId }) => {
  //console.log("lists:", lists);
  const [ addingList, setAddingList ] = useState(false);
  const [ newListTitle, setNewListTitle ] = useState("");
  const dispatch = useDispatch();

  const generateNewListClass = () => {
    if (addingList) {
      return "new-list selected";
    }
    return "new-list";
  };

  const toggleAddingList = e => {
    e.preventDefault();
    setAddingList(!addingList);
  };

  const handleNewListSubmit = e => {
    e.preventDefault();
    if (newListTitle) {
      dispatch(createList(boardId, newListTitle));
      toggleAddingList(e);
      setNewListTitle("");
    }
  };

  return (
    <main>
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {lists.map(list => <SingleList key={list._id} list={list} />)}
        </div>
        <div
          id="new-list"
          className={generateNewListClass()}
        >
          <span
            onClick={toggleAddingList}
          >
            Add a list...
          </span>
          <input
            type="text"
            placeholder="Add a list..."
            value={newListTitle}
            onChange={e => setNewListTitle(e.target.value)}
          />
          <div>
            <input
              type="submit"
              className="button"
              value="Save"
              onClick={handleNewListSubmit}
            />
            <i
              className="x-icon icon"
              onClick={toggleAddingList}
            >
            </i>
          </div>
        </div>
      </div>
    </main>
  )
};

const MenuSidebar = () => {
  return(
    <div className="menu-sidebar">
      <div id="menu-main" className="main slide">
        <i className="back-icon icon"></i>
        <i className="x-icon icon"></i>
        <h1>Menu</h1>
        <div className="menu-contents">
          <div className="members">
            <div className="member-container">
              <div className="card-member ">VR</div>
            </div>
            <div className="member-container">
              <div className="card-member admin">TP</div>
            </div>
            <div className="member-container">
              <div className="card-member ">KW</div>
            </div>
          </div>
          <div className="add-members">
            <i className="add-icon sm-icon"></i>Add Members...
          </div>
          <hr />
          <ul className="menu-list">
            <li className="background-item">Change Background</li>
            <li className="filter-icon menu-icon">Filter Cards</li>
            <li className="power-icon menu-icon not-implemented">Power-Ups</li>
            <li className="stickers-icon menu-icon not-implemented">Stickers</li>
            <li className="more-icon menu-icon">More</li>
            <hr />
            <li className="activity-icon menu-icon not-implemented">Activity</li>
          </ul>
          <ul className="activity-list">
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>yesterday at 4:53 PM</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> sent{" "}
                <span className="link">
                  Use the + in the top menu to make your first board now.
                </span>{" "}
                to the board <small>4 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> archived{" "}
                <span className="link">
                  Use the + in the top menu to make your first board now.
                </span>{" "}
                <small>4 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>5 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>6 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>yesterday at 10:23 PM</small>
              </p>
            </li>
          </ul>
          <a className="all-activity not-implemented">View all activity...</a>
        </div>
      </div>
    </div>
  )
}

const SingleBoard = () => {
  const dispatch = useDispatch()

  const id = useParams().id;


  useEffect(() => {
    dispatch(fetchBoard(id));

    if (!boards || boards.length === 0) {
      dispatch(fetchBoards())
    }

  }, [dispatch])

  const lists = useSelector(state => state.lists);




  const board = useSelector(state => state.boards.find(board => board._id === id));
  const boards = useSelector(state => state.boards)

  if (board === undefined) {
    console.log('Oh shit...board not found!');
    return null;
  }



  return (
    <>
      <Header board={board}/>
      <Main lists={lists} boardId={board._id}/>
      <MenuSidebar />
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default SingleBoard;
