const prisma = require("../prisma/prismaClient");
const bcrypt = require('bcrypt');

const db = require('../prisma/queries')
// Dont forget to add validation and sanitization with express-validator

async function getNewUser(req, res) {
    res.render('register');
}

async function postNewUser(req, res) {
    try {
        // Extract user details from the request
        const { username, password } = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Add the new user to the database
        await db.addUser(username, hashedPassword);
        
        // Redirect to the home page on success
        res.redirect('/');
    } catch (error) {
        // Log the error and respond with an appropriate message
        console.error('Error creating new user:', error);
        res.status(500).send('Internal Server Error');
    }

    const users = await prisma.users.findMany();
    console.log(users)
    
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
    getNewUser,
    postNewUser,
    newBook
};
