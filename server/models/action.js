const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: String,
  cardId: {
    type: Schema.Types.ObjectId,
    required: [true, "Board ID is required"],
  },
},
{ timestamps: true },
);

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;


/*
"actions": [
  {

    "description": " added this card to My list",

    "card_id": 9
  }
*/
