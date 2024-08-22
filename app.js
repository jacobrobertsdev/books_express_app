// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import and initialize Express
const express = require('express');
const app = express();

// Import methodOvveride (for delete request)
const methodOverride = require('method-override');


// Import and initialize Passport and related packages
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// Import routers
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

// Setup EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up method-override
app.use(methodOverride('_method'));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Flash and session middleware
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
const initializePassport = require('./passport-config');
initializePassport(passport);
app.use(passport.session());

// Use routers
app.use('/', indexRouter);
app.use('/user', userRouter);

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
