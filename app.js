const express = require('express');
const app = express();
require('dotenv').config()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log("Listening"));