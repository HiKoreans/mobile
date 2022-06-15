const express = require('express')
const recruitmentRouter = express.Router();
const {recruitment: recruitmentController} = require('../../controllers');

recruitmentRouter.post('/', recruitmentController.createRecruitment);
recruitmentRouter.get('/', recruitmentController.getRecruitment);
recruitmentRouter.get('/:recruitmentIdx', recruitmentController.getClickRecruitment);
recruitmentRouter.delete('/:recruitmentIdx', recruitmentController.deleteClickRecruitment);

module.exports = recruitmentRouter;