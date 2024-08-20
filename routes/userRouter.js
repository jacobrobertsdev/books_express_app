const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/userController');

userRouter.get('/register', controller.getNewUser);
userRouter.post('/register', controller.postNewUser);
userRouter.get('/:userID/book/new', controller.newBook);

userRouter.get('/:userID')
module.exports = userRouter;