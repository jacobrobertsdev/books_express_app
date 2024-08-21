const prisma = require("../prisma/prismaClient");
const bcrypt = require('bcrypt');
const db = require('../prisma/queries')
const { validationResult } = require('express-validator');
const validations = require('../middleware/validations');

// Render the new user registration view
function getNewUser(req, res) {
    res.render('register');
}

// Render login view
function getLogin(req, res) {
    res.render('login');
}

// Validate user inputs and add new user to database query function (addUser())
const postNewUser = [
    validations.userForm,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation errors exist, render the form again with error messages
            return res.render('register', { errors: errors.array() });
        }
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
            res.status(500).render('register', { errorMessage: error.message });
        }
    }
]

// Render add new book view
async function getNewBook(req, res) {
    res.render('addBook');
}

// Validate new book inputs and add to database
const postNewBook = [
    validations.bookForm,
    async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation errors exist, render the form again with error messages
            return res.render('addBook', { errors: errors.array() });
        }

        try {
            const { title, author, genre, rating } = req.body;
            const userId = req.user.id; // Assuming you have user data in req.user
            // Create new book entry
            await prisma.books.create({
                data: {
                    title,
                    author,
                    genre,
                    rating,
                    userId, // Associate the book with the logged-in user
                },
            });
            // Redirect to a success page or user's dashboard
            res.redirect(`/user/dashboard/${userId}`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
]


// Render edit book form
async function getEditBook(req, res) {
    try {
        const book = await db.getBookByID(req.params.bookID);
        res.render('editBook', { id: book.id, title: book.title, author: book.author, genre: book.genre, rating: book.rating });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Validate edit book inputs and add to database
const postEditBook = [
    validations.bookForm,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If validation errors exist, render the form again with error messages
            return res.render('editBook', { errors: errors.array() });
        }

        const id = req.params.bookID;
        const data = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            rating: req.body.rating
        }

        try {
            await db.updateBook(id, data);
            const userID = req.user.id;
            res.redirect(`/user/dashboard/${userID}`);

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }

    }
]


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
        res.status(500).send('Internal Server Error');
    }
}

// Render dashboard with user-specific content
async function userDashboard(req, res) {
    const { userID } = req.params;
    try {
        const user = await prisma.users.findUnique({ where: { id: userID } });
        const books = await prisma.books.findMany({ where: { userId: userID } });
        res.render('dashboard', { books, userID: user.id, username: user.username });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

// Delete book from database
async function deleteBook(req, res) {
    const id = req.params.bookID;
    try {
        await db.deleteBookByID(id);
        const userID = req.user.id;
        res.redirect(`/user/dashboard/${userID}`);
    } catch (error) {
        res.status(500).send('Internal Server Error');

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
