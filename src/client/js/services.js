/**
 * Created by davidsudia on 4/13/16.
 */
app.service('dataService', ['$http', ($http) => {

  var data = [];
  
  return {
    getAllStudents: function() {
      return data;
    }
  }

}]);