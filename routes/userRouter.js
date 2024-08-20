const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');
const controller = require('../controllers/userController');
const auth = require('../middleware/authentication');


userRouter.post('/login', auth.checkNotAuthenticated, passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true,
}), controller.getDashboard);

userRouter.get('/login', controller.getLogin);

userRouter.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/user/login');
    });
});

userRouter.get('/register', auth.checkNotAuthenticated, controller.getNewUser);
userRouter.post('/register', auth.checkNotAuthenticated, controller.postNewUser);
userRouter.get('/book/new', auth.checkAuthenticated, controller.newBook);

userRouter.get('/dashboard/:userID', auth.checkAuthenticated, controller.userDashboard)



module.exports = userRouter;