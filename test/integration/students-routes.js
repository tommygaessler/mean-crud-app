process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var utilities = require('../utilities');

chai.use(chaiHttp);


describe('student routes', function() {

  beforeEach(function(done) {
    utilities.dropDb(done);
  });

  afterEach(function(done) {
    utilities.dropDb(done);
  });


  describe('/GET students', function() {

    it('it should return all students', function(done) {
      chai.request(server)
        .get('/students')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          res.body.should.have.property('data');
          res.body.data.length.should.equal(0);
          done();
        });
    });
  });

});
