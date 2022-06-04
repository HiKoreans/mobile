const express = require('express')
const secondhandRouter = express.Router();
const {secondhand: secondhandController} = require('../../controllers');

secondhandRouter.post('/', secondhandController.createSecondhand);


module.exports = secondhandRouter;