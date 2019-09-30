const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUsers(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id,iot: timestamp},config.secret);
}

exports.signin = function(req,res,next) {
  //already authenticated need to give jwt for future reference.
  res.send({token: tokenForUsers(req.user)});
}

exports.signup = function(req,res,next) {
    const email = req.body.email;
    const password = req.body.password;
    if(req.body) {
        User.findOne({ email: email},function(err,existingUser) {
            if(err) {
                return next(err);
            }
            if(existingUser) {
                return res.status(422).send({error: 'Email is in use'});
            }
            const user = new User({
                email: email,
                password: password
            });
            user.save(function(err) {
                if(err) {
                    return next(err);
                }
                //res.send(user);
                res.json({token: tokenForUsers(user) });
            });
        });
    }
}
