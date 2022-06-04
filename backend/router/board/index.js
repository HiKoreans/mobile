const express = require('express')
const boardRouter = express.Router();
const {board : boardController}  = require('../../controllers')


boardRouter.post('/', boardController.createBoard);
boardRouter.get('/', boardController.getBoard);
boardRouter.get('/:boardIdx', boardController.getClickBoard);

module.exports = boardRouter;