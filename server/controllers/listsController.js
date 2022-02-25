const Board = require("../models/board");
const List = require("../models/list");
require("../models/card");
require("../models/action");
const HttpError = require("../models/httpError");
const { validationResult } = require('express-validator');

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { boardId, list } = req.body;
    const board = await Board.findById(boardId);
    if (!board) {
      next(new HttpError('no board with that id exists', 404));
    } else {
      const newList = await List.create({ boardId, title: list.title });
      await Board.findOneAndUpdate({ _id: boardId },{ $push: { lists: newList._id } });
      res.status(201).json({ newList });
    }
  } else {
    next(new HttpError('list title and board id are required', 422))
  }
};

const patchList = async (req, res, next) => {
  const listId = req.params.id;
  const { title, position } = req.body;
  try {
    const list = await List.findById(listId);
    if (!list) {
      res.status(404).json({ error: "list not found" })
      return
    }
    if (!title && !position) {
      res.status(422).json({ error: "title or position required" })
      return
    }
    const patchedList = await List.findOneAndUpdate(
      { _id: listId },
      req.body,
      { new: true }
    );
    res.status(200).json({ patchedList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.createList = createList;
exports.patchList = patchList;
