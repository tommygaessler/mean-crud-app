/**
 * Created by davidsudia on 4/13/16.
 */
app.controller('addStudentController', ['$scope', 'studentDataService', ($scope, studentDataService) => {

  $scope.student= {};

  studentDataService.getAllStudents()
    .then((students) => {
      $scope.allStudents = students.data.data;
    });

  $scope.addStudent = () => {
    studentDataService.addStudent($scope.student)
      .then((data) => {
        studentDataService.getAllStudents()
          .then((students) => {
            $scope.allStudents = students.data.data;
            $scope.student = {};
          });
      });

  }

}]);