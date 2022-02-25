const {check} = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateCard = [check("listId").not().isEmpty()];
exports.validateList = [
  check("title").not().isEmpty(),
  check("boardId").not().isEmpty(),
];
