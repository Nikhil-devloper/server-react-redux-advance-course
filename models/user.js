const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');



//Define our model -->
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
});

//On save hooks, encrypt(Hash) password
userSchema.pre('save',function(next) {
  const user  = this;
  var salt = bcrypt.genSaltSync(10); //see syn fucction
  var hash = bcrypt.hashSync(user.password, salt); // see  a sync function
  user.password= hash;
  next();
});

userSchema.methods.comparePassword = function(candidatePassword,callback) {
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch) {
        if(err) {
          return callback(err);
        }
        callback(null,isMatch);
    });
}

//creating a modal class -->
const ModelClass = mongoose.model('User',userSchema);
module.exports = ModelClass;
