const HttpError = require("../models/httpError");

const Card = require('../models/card');
require('../models/comment');
require('../models/action');

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

exports.getCard = getCard;
