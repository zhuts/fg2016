angular.module('app', [])

.controller('MainController', function($scope, Meal){
    angular.extend($scope, Meal);
    // $scope.getReddit = function(){
    //   Reddit.getData()
    //     .then(function(data){
    //       $scope.reddit = data;
    //     })
    //     .catch(function(err) {
    //       console.error(err);
    //     })
    // }
})//no semi-colon

.factory('Meal', function(){
  var courses = [];
  var addCourse = function(course, name, type){
    courses.push({title: course, name: name, type: type}); 
  };  
  var deleteCourse = function(index){
    courses.splice(index,1);
  }; 

  return {
    courses: courses,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
  };
})

// .factory("Reddit", function($http){
//   var getData = function(){
//     return $http({
//       method:'GET',
//       url: 'https://www.reddit.com/.json'
//     })
//     .then(function(res){
//       return res.data;
//     });
//   };

//   return {
//     getData: getData
//   }
// });



