const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required'],
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: [true, "Board ID is required"],
  },
  position: {
    type: Number,
    default: 65536,
  },
  cards: [{type: [Schema.Types.ObjectId], ref: "Card" }],
},
{ timestamps: true },
);

const List = mongoose.model('List', ListSchema);

module.exports = List;
