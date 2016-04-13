/**
 * Created by davidsudia on 4/13/16.
 */
app.service('studentDataService', ['owleryService', (owleryService) => {

  return {

    getAllStudents: () => {
      return owleryService.getAll('students')
        .then((students) => {
          return students;
        });
    },

    addStudent: (payload) => {
      return owleryService.addOne('students', payload)
        .then((student) => {
          return student;
        })
    }

  }
}]);


app.service('owleryService', ['$http', ($http) => {

  return {

    getAll: (resource) => {
      return $http.get('/' + resource)
        .catch((err) => {
          return err;
        })
        .then((res) => {
          return res;
        });
    },

    addOne: (resource, payload) => {
      var arr = []
      arr.push(payload);
      return $http.post('/' + resource, arr)
        .catch((err) => {
          return err;
        })
        .then((res) => {
          return res;
        });
    }
  }

}]);