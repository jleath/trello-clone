const Board = require("../models/board");
require("../models/list");
require("../models/card");
require("../models/action");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");


const getBoard = async (req, res, next) => {
  const id = req.params.id;

  try {
    const answer = await Board.findById(id).populate({
      path:"lists",
      populate: {
        path: "cards",
        populate: {
          path: "actions",
        },
      },
    });

    if (answer) {
      res.json({ answer });
    } else {
      res.status(404).json({error: "That board does not exist"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({error: "no"});
  }
}

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;
