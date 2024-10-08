const express = require('express');
const session = require('express-session');
const path = require('path'); 
const router = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '123', 
  resave: false,
  saveUninitialized: true,
}));

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', router);

console.log(`Server running on http://localhost:3000`);

module.exports = app;