//Description: This files handles all the incoming and outgoing routes

//Required modules
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});
const passport = require('passport');
const controller = require('../controller/controller')


//---------------------HOME------------------------
router.get('/', function(req, res)
{
    const feed = {};
    feed.msg="home";
    res.render("index", {data:feed});
});

//--------------------LOG IN-----------------------
//Login POST Route
router.post('/', urlencodedparser, controller.auth);
router.post('/login', urlencodedparser, controller.auth);

//--------------------LOG OUT-----------------------
//Logout POST Route
router.post('/logout', controller.logout);

//--------------------SIGNUP----------------------
//Signup GET Route
router.get('/signup', function(req, res)
{
    const feed = {};
    res.render("signup", {data:feed});
});
//Signup POST Route
router.post('/signup', urlencodedparser, controller.insertUser);


//--------------------FEEDBACK--------------------
//Feedback GET Route
router.get('/feedback', controller.reqAuth, function(req, res)
{
    const feed = {};
    feed.msg="feedback";
    res.render("feedback",
    {
        firstname: req.session.user.firstname,
        lastname: req.session.user.lastname,
        email: req.session.user.email,
        data: feed
    });
    console.log("Autofill completed");
});
//Feedback POST Route
router.post('/feedback', controller.reqAuth, urlencodedparser, controller.insertFeedback);

//---------------PASSPORT CONFIG-----------------
// used to serialize the user for the session
passport.serializeUser(function(username, done) {
    done(null, username); 
});

// used to deserialize the user
passport.deserializeUser(function(username, done) {
        done(null, username);
});

module.exports = router;