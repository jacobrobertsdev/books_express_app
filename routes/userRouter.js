const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');
const controller = require('../controllers/userController');
const auth = require('../middleware/authentication');

/* POST requests to /login
   * Middleware `auth.checkNotAuthenticated` ensures user is not already authenticated.
   * On authentication failure, the user is redirected to /user/login and an error message is flashed.
   * On successful authentication, the request is passed to `controller.getDashboard` to handle the dashboard view.
*/
userRouter.post('/login', auth.checkNotAuthenticated, passport.authenticate('local', {
   failureRedirect: '/user/login',
   failureFlash: true,
}), controller.getDashboard);

/* GET requests to /login
   * Calls `controller.getLogin` to render login page.
*/
userRouter.get('/login', controller.getLogin);

/* POST requests to /logout
   * `req.logout()` logs out the user, invalidating the user’s session.
   * Any error during logout is passed to the next middleware for handling.
   * On successful logout, user is redirected to /user/login.
*/
userRouter.post('/logout', (req, res, next) => {
   req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/user/login');
   });
});

/* GET requests to /register
   * Middleware `auth.checkNotAuthenticated` ensures that the user is not already authenticated.
   * Calls `controller.getNewUser` to render the registration page.
*/
userRouter.get('/register', auth.checkNotAuthenticated, controller.getNewUser);

/* POST requests to /register
   * Middleware `auth.checkNotAuthenticated` ensures that the user is not already authenticated.
   * Calls `controller.postNewUser` to handle the registration logic and create a new user in DB.
*/
userRouter.post('/register', auth.checkNotAuthenticated, controller.postNewUser);

/* GET requests to /book/new
   * Middleware `auth.checkAuthenticated` ensures that the user is authenticated.
   * Calls `controller.newBook` to render the form page for adding a new book.
*/
userRouter.get('/book/new', auth.checkAuthenticated, controller.getNewBook);
userRouter.post('/book/new', auth.checkAuthenticated, controller.postNewBook);
userRouter.get('/book/edit/:bookID', auth.checkAuthenticated, controller.getEditBook);
userRouter.post('/book/edit/:bookID', auth.checkAuthenticated, controller.postEditBook);
userRouter.delete('/book/delete/:bookID', auth.checkAuthenticated, controller.deleteBook);
/* GET requests to /dashboard/:userID
   * Middleware `auth.checkAuthenticated` ensures that the user is authenticated.
   * Calls `controller.userDashboard` to render the user's dashboard.
   * The `:userID` parameter is used to fetch and display information specific to the user.
*/
userRouter.get('/dashboard/:userID', auth.checkAuthenticated, controller.userDashboard);

module.exports = userRouter;
