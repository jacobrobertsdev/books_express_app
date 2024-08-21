const prisma = require("../prisma/prismaClient");
const bcrypt = require('bcrypt');
const db = require('../prisma/queries')
const { body, validationResult } = require('express-validator');
// Dont forget to add validation and sanitization with express-validator

// Render the new user registration view
function getNewUser(req, res) {
    res.render('register');
}

// Render login view
function getLogin(req, res) {
    res.render('login');
}

// Use registration POST request to create new user calling the appropriate model function (addUser())
async function postNewUser(req, res) {
    try {
        // Extract user details from the request
        const { username, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Add the new user to the database
        await db.addUser(username, hashedPassword);
        // Redirect to the login page on success
        res.redirect('/user/login');

    } catch (error) {
        // Pass error to register view
        console.log(error);
        res.render('register', { errorMessage: error.message });
    }
}

async function getNewBook(req, res) {
    res.render('addBook');
}



// Add validation and sanitization middleware
const validateBook = [
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('author').optional().trim().escape(),
    body('genre').optional().trim().escape(),
];

async function postNewBook(req, res) {
    // Validate request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If validation errors exist, render the form again with error messages
        return res.render('addBook', { errors: errors.array() });
    }

    try {
        const { title, author, genre } = req.body;
        const userId = req.user.id; // Assuming you have user data in req.user

        // Create new book entry
        await prisma.books.create({
            data: {
                title,
                author,
                genre,
                userId, // Associate the book with the logged-in user
            },
        });

        // Redirect to a success page or user's dashboard
        res.redirect(`/user/dashboard/${userId}`);
    } catch (error) {
        console.error('Error adding new book:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getEditBook(req, res) {
    try {
        const book = await db.getBookByID(req.params.bookID);
        res.render('editBook', { id: book.id, title: book.title, author: book.author, genre: book.genre });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


async function postEditBook(req, res) {
    const id = req.params.bookID;
    const data = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    }

    try {
        await db.updateBook(id, data);
        const userID = req.user.id;
        res.redirect(`/user/dashboard/${userID}`);

    } catch (error) {
        res.status(500).send('Error from post book edit controller');
    }

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

async function deleteBook(req, res) {
    const id = req.params.bookID;
    try {
        await db.deleteBookByID(id);
        const userID = req.user.id;
        res.redirect(`/user/dashboard/${userID}`);
    } catch (error) {
        res.status(500).send('Error deleting data.');

    }

}

module.exports = {
    getNewUser,
    postNewUser,
    getNewBook,
    postNewBook,
    getDashboard,
    userDashboard,
    getLogin,
    getEditBook,
    postEditBook,
    deleteBook
};
