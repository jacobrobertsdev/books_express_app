const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/userController');

userRouter.get('/register', controller.registerNewUser);
// userRouter.get('/:id', controller.userDashboard);

module.exports = userRouter;