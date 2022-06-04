const express = require('express')
const anonymousRouter = express.Router();
const {anonymous: anonymousController} = require('../../controllers');


anonymousRouter.post('/signup', anonymousController.signUP);
anonymousRouter.post('/signin', anonymousController.signIn);

module.exports = anonymousRouter;