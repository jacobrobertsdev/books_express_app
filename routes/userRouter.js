const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');
const controller = require('../controllers/userController');
const auth = require('../middleware/authentication');


// Login POST
userRouter.post('/login', auth.checkNotAuthenticated, passport.authenticate('local', {
   failureRedirect: '/user/login',
   failureFlash: true,
}), controller.getDashboard);

// Get login form
userRouter.get('/login', controller.getLogin);

// Logout form
userRouter.post('/logout', (req, res, next) => {
   req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/user/login');
   });
});

// New user registration page
userRouter.get('/register', auth.checkNotAuthenticated, controller.getNewUser);

// Post new user
userRouter.post('/register', auth.checkNotAuthenticated, controller.postNewUser);

// Get new book form
userRouter.get('/book/new', auth.checkAuthenticated, controller.getNewBook);

// Post new book
userRouter.post('/book/new', auth.checkAuthenticated, controller.postNewBook);

// Get edit book form
userRouter.get('/book/edit/:bookID', auth.checkAuthenticated, controller.getEditBook);

// Post book edits
userRouter.post('/book/edit/:bookID', auth.checkAuthenticated, controller.postEditBook);

// Post delete book
userRouter.delete('/book/delete/:bookID', auth.checkAuthenticated, controller.deleteBook);

// Get user dashboard
userRouter.get('/dashboard/:userID', auth.checkAuthenticated, controller.userDashboard);

module.exports = userRouter;
