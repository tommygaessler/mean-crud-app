var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  dropDb: (done) => {
    mongoose.connection.db.dropDatabase();
    if (done) {
      done();
    }
  }

};
