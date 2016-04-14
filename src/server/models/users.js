var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: bool,
    default: false,
    required: true
  }
});

var User = mongoose.model('students', UserSchema);

module.exports = User;
