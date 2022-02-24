const HttpError = require("../models/httpError");
const Card = require('../models/card');
const List = require('../models/list');
require('../models/comment');
const Action = require('../models/action');

const getCard = async (req, res, next) => {
  const cardId = req.params.id;
  const card =
    await Card
      .findById(cardId)
      .populate({ path: 'actions' })
      .populate({ path: 'comments' });
  if (!card) {
    res.status(404).json({ error: 'no card with that id' });
    return;
  }
  res.json(card);
};

const buildCard = async (list, newCard) => {
  newCard.boardId = list.boardId;
  let savedCard = await new Card(newCard).save();

  const newAction = {
    description: `added this card to ${list.title}`,
    cardId: savedCard._id
  };
  const savedAction = await new Action(newAction).save();

  savedCard = await Card.findByIdAndUpdate(
    savedCard._id,
    { $push: { actions: savedAction._id } },
    { new: true }
  ); // Trevor won in the end!

  await List.findByIdAndUpdate(list._id, { $push: { cards: savedCard._id } });

  return savedCard;
};

const createCard = async (req, res, next) => {
  const { body } = req;
  const newCard = {
    listId: body.listId,
    title: body.card.title
  };
  let list;
  try {
    if (!newCard.listId) {
      res.status(404).json({ error: "list id not found, buddy!" });
      return
    } else {
      list = await List.findById(newCard.listId);
      if (!list) {
        res.status(404).json({ error: "can't find list, buddy!" });
        return
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error", err });
  }
  const savedCard = await buildCard(list, newCard);
  res.status(201).json({ savedCard });
};

exports.getCard = getCard;
exports.createCard = createCard;
