var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
const db = require("./database/mongus.js")
var userRouter = require('./routes/UserRoute');
var playerRouter = require('./routes/PlayerRoute.js')

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use('/user', userRouter)
app.use('/player', playerRouter)

module.exports = app;
