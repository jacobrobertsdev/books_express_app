const prisma = require("../prisma/prismaClient");
const bcrypt = require('bcrypt');
const db = require('../prisma/queries')
// Dont forget to add validation and sanitization with express-validator

function getNewUser(req, res) {
    res.render('register');
}

function getLogin(req, res) {
    res.render('login');
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
        res.redirect('/user/login');

    } catch (error) {
        // Log the error
        res.render('register', { errorMessage: error });
    }
}

async function newBook(req, res) {
    // add a book to DB
    // where req.params.userID == user.id
    // some validation stuff
    res.render('addBook');
}

// LOGIN success redirect
async function getDashboard(req, res) {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            // Redirect to login if no user is found
            return res.redirect('/login');
        }

        // Redirect to the user's dashboard
        res.redirect(`/user/dashboard/${req.user.id}`);
    } catch (error) {
        // Log the error for debugging
        console.error('Error in getDashboard function:', error);

        // Handle the error (e.g., show an error page or redirect to an error route)
        res.status(500).send('Internal Server Error');
    }
}

async function userDashboard(req, res) {
    const { userID } = req.params;
    try {
        const user = await prisma.users.findUnique({ where: { id: userID } });
        const books = await prisma.books.findMany({ where: { userId: userID } });
        res.render('dashboard', { books, userID: user.id, username: user.username });
    } catch (error) {
        res.status(500).send('Error retrieving user data.');
    }
}

module.exports = {
    getNewUser,
    postNewUser,
    newBook,
    getDashboard,
    userDashboard,
    getLogin
};
