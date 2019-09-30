const express = require('express');
const myRouter = express.Router();
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport.js');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt',{session: false});
const requiredSignIn = passport.authenticate('local',{session: false});


myRouter.post('/signup',Authentication.signup);

myRouter.post('/signin',requiredSignIn,Authentication.signin);



myRouter.get('/',requireAuth,(req,res) => {
    res.send({hi: 'there'});
});

//protected resource
// myRouter.get('/',(req,res) => {
//     console.log('range');
//     //console.log('Inside user router');
//     res.send({hi: 'there'});
// });



myRouter.post('/',(req,res) => {
    //console.log('Inside user post router');
    res.send('Hello post');
});

module.exports = myRouter;
