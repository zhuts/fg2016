var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);


angular.module('app', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'underscore'])

.controller('MainController', function($scope, socket, _){
  $scope.loading = true;
  
  $scope.courses = {};
  $scope.coursesArray = [];
  $scope.user = undefined;

  var buildCoursesArray = function(){
    let newArr = [];
    for (var key in $scope.courses) {
      newArr.push($scope.courses[key]);      
    };
    console.log(newArr);
    $scope.coursesArray = _.uniq(newArr);
  };


  
  var updateMealOnClient = function(obj){    
    if(Array.isArray(obj)) {
      $scope.coursesArray = obj;
    } else {
      $scope.courses = obj;
      buildCoursesArray();      
    }
  };

  var changeToMeal = function(){
    socket.emit("changeToMeal", $scope.courses, socketCb);
    console.log("changeToMeal called");
  };

  var socketCb = function(val){
    console.log(val,"socketCB called!");
  };

  socket.on("updateMeal", updateMealOnClient);

  //attaching the functions to scope because lazy, should be services

  $scope.login = function (enteredUser) {
    console.log(enteredUser);
    console.log($scope);
    $scope.user = enteredUser;
  };

  $scope.logout = function(){
    $scope.user = undefined;
  };

  $scope.addFood = function(food, course){
    //check courses object for course
    let foodData={[food]:{"food":food,"user":$scope.user,"course":course}};
    console.log(foodData);
    if($scope.user && !_.contains($scope.courses,foodData)) {
      Object.assign($scope.courses, foodData);
      console.log('56',$scope.courses);
      buildCoursesArray();
      changeToMeal();      
    };
  };

  $scope.removeFood = function(index){
    //delete from coursesArray
    $scope.coursesArray.splice(index,1);
    let newCoursesObj = $scope.coursesArray.reduce((accum, val, i)=>{
      accum[i] = val;
      return accum;
    },{});
    $scope.courses = newCoursesObj;
    changeToMeal();
  };

})

//services
.factory('socket', function ($rootScope) {
  // For development testing need to set it to use 'http://' since localhost uses http
  // For production, can use either http or https but the web address will have to match it
  var socket = io.connect('http://' + window.location.hostname + ":" + location.port);
  console.log('http://' + window.location.hostname + ":" + location.port);
  // Error handling can be applied passing in a callback when executing socket methods on or emit
  
  var on = function (eventName, callback) {
    socket.on(eventName, function () {  
      var args = arguments;
      console.log(args);
      $rootScope.$apply(function () {
        callback.apply(socket, args);
      });
    });
  };

  var emit = function (eventName, data, callback) {
    socket.emit(eventName, data, function () {
      var args = arguments;
      console.log(args);
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    });
  };

  return {
    on: on,
    emit: emit
  };
});



