const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  cardId: {
    type: Schema.Types.ObjectId,
    required: [true, "Card ID is required"],
  },
},
{ timestamps: true },
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;