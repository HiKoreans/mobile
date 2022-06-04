const express = require('express')
const recruitmentRouter = express.Router();
const {recruitment: recruitmentController} = require('../../controllers');

recruitmentRouter.post('/', recruitmentController.createRecruitment);


module.exports = recruitmentRouter;