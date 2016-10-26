angular.module('app', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])


.controller('MainController', function($scope, socket){
  $scope.loading = true;
  //courses is a JSON object for socket.io
  $scope.courses = {};
  $scope.coursesArray = [];
  $scope.user = undefined;

  var buildCoursesArray = function(){
    for (key in $scope.courses) {
      $scope.coursesArray.push($scope.courses[key]);
    }
  };

  var updateMealOnClient = function(obj){
    $scope.courses = obj;
    buildCoursesArray();
  };

  var changeToMeal = function(){
    socket.emit("changeToMeal", $scope.courses, socketCb);
    console.log("changeToMeal called");
  };

  var socketCb = function(val){
    console.log(val,"socketCB called!");
  };

  socket.on("updateMeal", changeToMeal);

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
    if($scope.user && !$scope.courses[{food:{"food":food,"user":$scope.user,"course":course}}]) {
      Object.assign($scope.courses,{food:{"food":food,"user":$scope.user,"course":course}});
      buildCoursesArray();
    };
    changeToMeal();
  };

  $scope.removeFood = function(index){
    //delete from coursesArray
    $scope.coursesArray.splice(index);
    let newCoursesObj = $scope.coursesArray.reduce((accum, val, i)=>{
      accum[i] = val;
      return accum;
    },{});
    console.log($scope.coursesArray);
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




