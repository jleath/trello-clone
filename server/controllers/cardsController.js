const HttpError = require("../models/httpError");
const Card = require('../models/card');
const List = require('../models/list');
require('../models/comment');
const Action = require('../models/action');
const { validationResult } = require('express-validator');

const getCard = async (req, res, next) => {
  const cardId = req.params.id;
  const card =
    await Card
      .findById(cardId)
      .populate({ path: 'actions' })
      .populate({ path: 'comments' });
  if (!card) {
    next(new HttpError('invalid card id', 404));
  }
  res.json(card);
};

const createNewAction = (description, cardId) => {
  const newAction = { description, cardId };
  return new Action(newAction).save();
}

const addActionToCard = (cardId, actionId) => {
  return Card.findByIdAndUpdate(
    cardId,
    { $push: { actions: actionId } },
    { new: true }
  );
};

const addCardToList = (card) => {
  return List.findByIdAndUpdate(card.listId, { $push: { cards: card._id } });
};

const buildCard = async (list, newCard) => {
  newCard.boardId = list.boardId;
  try {
    const savedCard = await new Card(newCard).save();
    const createdAction = await createNewAction(`added this card to ${list.title}`, savedCard._id);
    const updatedCard = await addActionToCard(createdAction.cardId, createdAction._id);
    await addCardToList(updatedCard);
    return updatedCard;
  } catch (err) {
    console.log(err);
  }
}

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { listId, card } = req.body;
    const newCard = { listId, title: card.title };
    List.findById(newCard.listId)
      .then(list => buildCard(list, newCard))
      .catch(_ => Promise.reject(new Error('list not found')))
      .then(savedCard => res.status(201).json(savedCard))
      .catch(err => {
        console.log(err);
        if (err.message === 'list not found') {
          next(new HttpError("That list don't exist bud.", 404));
        } else {
          next(new HttpError("Internal Server Error", 500));
        }
      });
  } else {
    next(new HttpError("need to provide a list id buddy!", 404));
  }
};

exports.getCard = getCard;
exports.createCard = createCard;
