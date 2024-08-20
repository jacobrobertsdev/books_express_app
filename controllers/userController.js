
// Dont forget to add validation and sanitization with express-validator

async function registerNewUser(req, res) {
   // some validation stuff
    res.render('register');
}

async function newBook(req, res) {
    // add a book to DB
    // where req.params.userID == user.id
    // some validation stuff
     res.render('addBook');
}
 
// LOGIN

// async function userDashboard(req, res) {
//     // use req.params.userID to get books from User.books where user.id == req.params.userID
//     // username == db query to get user.username
//     // pass the books to the dashboard view
//      res.render('dashboard', { books , username});
//  }
 
module.exports = {
    registerNewUser,
    newBook
};
