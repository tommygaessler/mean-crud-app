var Students = require('../students');

var data = [
  {
    firstName: 'Harry',
    lastName: 'Potter',
    year: 1
  },
  {
    firstName: 'Ron',
    lastName: 'Weasley',
    year: 1
  },
  {
    firstName: 'Cedric',
    lastName: 'Diggory',
    year: 2
  }
];

var runTestSeed = function (done) {
  return Students.insertMany(data)
    .then((data) => {
      done();
    });
};


module.exports = runTestSeed;