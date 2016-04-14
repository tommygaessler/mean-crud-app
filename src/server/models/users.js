var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false,
    required: true
  }
});

// hash the password before saving it to the db
UserSchema.pre('save', (next) => {

  // only hash if passwrord is new or being modified
  if(!user.isModified('password')) {
    return next();
  }

  // salt and hash password
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    // override the plain text password
    user.password = hash;
    next();
  });

  UserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function(err, match) {
      if (err) {
        return done(err);
      }
      done(err, match);
    });
  }




});

// compare password to verify plain text against the hashed password

var User = mongoose.model('students', UserSchema);

module.exports = User;
