const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/userController');

userRouter.get('/signup', controller.newUserSignup);
// userRouter.get('/:id', controller.userDashboard);

module.exports = userRouter;