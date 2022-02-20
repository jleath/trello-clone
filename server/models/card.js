const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required'],
  },
  description: String,
  boardId: {
    type: Schema.Types.ObjectId,
    required: [true, "Board ID is required"],
  },
  listId: {
    type: Schema.Types.ObjectId,
    required: [true, "List ID is required"],
  },
  position: {
    type: Number,
    default: 65536,
  },
  labels: [String],
  archived: Boolean,
  dueDate: Date,
  completed: Boolean,
  comments: [String],
  actions: [{type: [Schema.Types.ObjectId], ref: "Action" }],
  commentsCount: Number,
},
{ timestamps: true },
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

/*
 {
  "description": "",
  "labels": [],
  "archived": false,
  "dueDate": null,
  "completed": false,
  "comments": [],
  "actions": []
  "commentsCount": 0
}
*/