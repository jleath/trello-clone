const Board = require("../models/board");
const List = require("../models/list");
require("../models/card");
require("../models/action");
//const HttpError = require("../models/httpError");

const createList = async (req, res, next) => {
  const { boardId, list } = req.body;
  try {
    const newList = await List.create({ boardId, title: list.title });
    await Board.findOneAndUpdate(
      { _id: boardId },
      { $push: { lists: newList._id } }, // Trevor won in the end!
    );
    res.status(201).json({ newList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
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
