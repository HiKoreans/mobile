const express = require('express')
const secondhandRouter = express.Router();
const {secondhand: secondhandController} = require('../../controllers');

secondhandRouter.post('/', secondhandController.createSecondhand);
secondhandRouter.get('/', secondhandController.getSecondhandList);
secondhandRouter.get('/:secondhandIdx', secondhandController.getClickSecondhand);

module.exports = secondhandRouter;