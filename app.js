const express = require('express');
const path = require('path'); 
const router = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

console.log(`Server running on http://localhost:3000`);

module.exports = app;