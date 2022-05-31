const express = require('express')
const basicRouter = express.Router();

const anonymous = require('./anonymous')
const board = require('./board')
const boardComment = require('./boardComment.js')
const recruitment = require('./recruitment')
const secondhand = require('./secondhand')
const secondhandComment = require('./secondhandComment.js')
const user = require('./user')

basicRouter.use('/', anonymous);
basicRouter.use('/board', board);
basicRouter.use('/bcomment', boardComment);
basicRouter.use('/recruitment', recruitment);
basicRouter.use('/secondhand', secondhand);
basicRouter.use('/shcomment', secondhandComment);
basicRouter.use('/user', user);




module.exports = {
    basicRouter
}