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
  // ensure the user exists
  User.findOne({email: req.body.eamil}, (err, user) => {
    if(err) {
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email does not exist'
      });
    }
    user.comparePassword(req.body.password, (err, match) => {
      if(err) {
        return next(err);
      }
      if(!match) {
        return res.status(401).json({
          status: 'fail',
          message: 'Password is not correct'
        });
      }
      var token = createToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.password
        }
      });
    });
  });
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

function ensureAuthenticated(req, res, next) {
  if(!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'fail',
      message: 'No header present or no authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // ensure that it is valid
  if (now > payload.exp) {
    return res.status(400).json({
      status: 'fail',
      message: 'Token has expired.'
    });
  }
}

module.exports = router;