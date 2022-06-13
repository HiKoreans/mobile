const express = require('express')
const boardComment = express.Router();
const {comment : commentController} = require('../../controllers')

boardComment.post('/', commentController.board.createBoardComment);
boardComment.get('/:boardIdx', commentController.board.getBoardComment);


module.exports = boardComment;