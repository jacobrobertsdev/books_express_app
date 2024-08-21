const { body } = require('express-validator');

const bookForm = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Title can contain alphanumeric characters and spaces only')
        .trim()
        .escape(),

    body('author')
        .notEmpty().withMessage('Author is required')
        .matches(/^[a-zA-Z\s.]+$/).withMessage('Author can contain letters, spaces, and periods only')
        .trim()
        .escape(),

    body('genre')
        .notEmpty().withMessage('Genre is required')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Genre can contain letters and spaces only')
        .trim()
        .escape(),
];

const userForm = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Username can contain letters and numbers only')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .trim()
        .escape(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]+$/).withMessage('Password can contain letters, numbers, and special characters')
        .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters long')
        .trim()
        .escape(),
];


module.exports = {
    bookForm,
    userForm
}