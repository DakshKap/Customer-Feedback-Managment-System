/*jshint esversion: 6 */
//Description: This file is the heart of the application, interconnects different files within the project

//Module for project
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/userRoute');
//Modules for authentication
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//Setting environment variable
const env = process.env.DEPLOY || "dev";
const conf=require('./config/'+env+".json");

// Set up express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Adding express middleware to serve the static page - e.g style.css
app.use("/public", express.static(__dirname+'/public'));

//Authentication Packages
require('./config/passport')(passport); // pass passport for configuration
app.use(session({secret: "secret@2018", saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


// Create the database connection 
mongoose.connect(conf.dburl); 

//Route
app.use('/', user);//routes wil be divided into their specific categories and files(yet to be done)

app.listen(conf.port);
console.log("Application started on port ", conf.port);