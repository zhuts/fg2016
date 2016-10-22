angular.module('courseServices', [])

  // super simple service
  // each function returns a promise object 
  .factory('Courses', function($http) {
    return {
      get : function() {
        return $http.get('/api/meals');
      },
      create : function(todoData) {
        return $http.post('/api/meals', courseData);
      },
      delete : function(id) {
        return $http.delete('/api/meals' + id);
      }
    }
  });