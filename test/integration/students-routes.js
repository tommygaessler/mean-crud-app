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


  describe('GET /students', function() {

    it('should return all students on a GET request', (done) => {
      chai.request(server)
        .get('/students')
        .then((res) => {
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
  });

  describe('POST /students', function() {

    it('should put a new student into the db on a POST request', (done) => {
      chai.request(server)
        .post('/students')
        .send([{firstName: 'Draco', lastName: 'Malfoy', year: 1}])
        .then((res) => {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          res.body.should.have.property('students');
          res.body.students.should.be.a('array');
          res.body.students[0].should.have.property('firstName');
          res.body.students[0].firstName.should.equal('Draco');
          done();
        });
    });
  });

  describe('PUT /students', function() {

    it('should update a student on a PUT request', (done) => {
      chai.request(server)
        .get('/students')
        .then((students) => {
          var studentID = students.body.data[0]._id;
          chai.request(server)
            .put('/students/' + studentID)
            .send({year: 2})
            .then((res) => {
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.status.should.equal('success');
              res.body.should.have.property('student');
              res.body.student.should.have.property('firstName');
              res.body.student.should.have.property('lastName');
              res.body.student.should.have.property('year');
              res.body.student.firstName.should.equal('Harry');
              res.body.student.lastName.should.equal('Potter');
              res.body.student.year.should.equal(2);
              done();
            });
        });
    });
  });

  describe ('DELETE /students', function() {

    it('should delete a student on a DELETE request', (done) => {
      chai.request(server)
        .get('/students')
        .then((students) => {
          var studentID = students.body.data[0]._id;
          chai.request(server)
            .delete('/students/remove/' + studentID)
            .then((res) => {
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.should.be.a('object');
              res.body.should.have.property('status');
              res.body.status.should.equal('success');
            })
            .catch(function(err) {
              console.log(err.original);
            })
            .then((data) => {
              chai.request(server)
                .get('/students')
                .end((err, res) => {
                  res.status.should.equal(200);
                  res.type.should.equal('application/json');
                  res.body.should.be.a('object');
                  res.body.should.have.property('status');
                  res.body.status.should.equal('success');
                  res.body.should.have.property('data');
                  res.body.data.length.should.equal(2);
                  res.body.data[0].firstName.should.equal('Ron');
                  res.body.data[0].lastName.should.equal('Weasley');
                  res.body.data[0].year.should.equal(1);
                  done();
                });
            });
        });
    });
  });
});
