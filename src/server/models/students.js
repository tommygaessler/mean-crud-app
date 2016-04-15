var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var faker = require('faker');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true
  }
});

var Student = mongoose.model('students', StudentSchema);

var student = new Student({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  year: faker.random.number(6)
});

student.save()
  .then(function (student) {console.log('success', student)})
  .catch(function(err) {console.log('error', err)});


module.exports = Student;
