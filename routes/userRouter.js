const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/userController');

userRouter.get('/register', controller.registerNewUser);
// userRouter.get('/:id', controller.userDashboard);
userRouter.get('/:userID/book/new', controller.newBook);

userRouter.get('/:userID')
module.exports = userRouter;