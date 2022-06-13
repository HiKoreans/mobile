const express = require('express')
const shCommentRouter = express.Router();
const {comment : commentController} = require('../../controllers')

shCommentRouter.post('/', commentController.secondhand.createSecondhandComment);
shCommentRouter.get('/:secondhandIdx', commentController.secondhand.getSecondhandComment);

module.exports = shCommentRouter;