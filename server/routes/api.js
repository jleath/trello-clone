const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard } = require("../validators/validators");

router.get('/boards/:id', boardsController.getBoard );

router.get('/boards', boardsController.getBoards );

router.post('/boards', validateBoard, boardsController.createBoard );

router.patch('/lists/:id', listsController.patchList );

router.post('/lists', listsController.createList );

router.get('/cards/:id', cardsController.getCard );

module.exports = router;
