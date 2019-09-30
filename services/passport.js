const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStatergy = require('passport-local');


//create a local LocalStatergy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStatergy(localOptions,function(email,password,done) {

    User.findOne({email: email},function(err,user) {
        if(err) {
          done(err);
        }
        if(!user) {
          return done(null,false);
        }
        //compare Pssword: is password equal to user password.
        user.comparePassword(password,function(err,isMatch) {
            if(err) { return done(err); }
            if(!isMatch) { return done(null,false); }
            return done(null,user);
        });
    })
});
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};
//create JWT Strategy
const jwtLogin = new JwtStratergy(jwtOptions,function(payload,done) {
  //see if the users Id in the payload exist in our database.
  User.findById(payload.sub,function(err,user) {
      if(err) {
        return done(err,false);
      }
      if(user) {
        //if it does call done with that other.
        done(null,user);
      }
      else {
        //otherwise call done without a user object
        done(null,false);
      }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
