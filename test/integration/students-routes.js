process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var utilities = require('../utilities');
var testSeed = require('../../src/server/models/seeds/test-seed');
var Promise = require('bluebird');

chai.use(chaiHttp);


describe('student routes', function() {

  beforeEach(function(done) {
    utilities.dropDb();
    testSeed(done);
  });

  afterEach(function(done) {
    utilities.dropDb(done);
  });


  describe('/GET students', function() {

    it('it should return all students', (done) => {
      chai.request(server)
        .get('/students')
        .then(function(res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          res.body.should.have.property('data');
          res.body.data.length.should.equal(3);
          res.body.data[0].firstName.should.equal('Harry');
          res.body.data[0].lastName.should.equal('Potter');
          res.body.data[0].year.should.equal(1);
          done();
        });
    });

    it('it should put a new student into the db', (done) => {
      chai.request(server)
        .post('/students')
        .send([{firstName: 'Draco', lastName: 'Malfoy', year: 1}])
        .then(function(res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          done();
      })
        .catch(function(err) {
          console.log(err);
        })
        .then(function(data) {
        chai.request(server)
          .get('/students')
          .end(function(err, res) {
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.status.should.equal('success');
            res.body.should.have.property('data');
            res.body.data.length.should.equal(4);
            res.body.data[4].firstName.should.equal('Harry');
            res.body.data[4].lastName.should.equal('Potter');
            res.body.data[4].year.should.equal(1);
            done();
          });
      })
    })

    

  });
});
