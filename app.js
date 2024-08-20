const express = require('express');
const app = express();
require('dotenv').config()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

app.use('/', indexRouter);
app.use('/user', userRouter);


const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log("Listening"));