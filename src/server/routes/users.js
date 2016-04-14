var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');

var User = require('../models/users');

router.get('/register', (req, res, next) => {
  // ensure user does not already exist
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(406).json({
        status: 'fail',
        message: 'Email already exists'
      });
    }

    // create a new user
    var user = new User(req.body);
    user.save(() => {
      // create token
      var token = generateToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.email
        }
      });
    });
  });
});

router.get('/login', (req, res, next) => {
  //
});

router.get('/logout', (req, res, next) => {
  //
});




// *** helpers *** //

// generate a token
function generateToken (user) {
  var payload = {
    exp: moment.add(14, 'days').unix(),
    init: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}


module.exports = router;