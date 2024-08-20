if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const initializePassport = require('./passport-config');
initializePassport(passport);

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

app.use('/', indexRouter);
app.use('/user', userRouter);


const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log("Listening"));
