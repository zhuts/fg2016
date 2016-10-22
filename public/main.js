angular.module('app', [])

.controller('MainController', function($scope, socket){
  $scope.loading = true;
  $scope.courses = [];

  socket.on('retrieveCourses', function(data, msg) {
    $scope.courses = data.courses;
  })

})

.factory('socket', function ($rootScope) {
  // For development testing need to set it to use 'http://' since localhost uses http
  // For production, can use either http or https but the web address will have to match it
  var socket = io.connect('http://' + window.location.hostname + ":" + location.port);
  console.log('http://' + window.location.hostname + ":" + location.port);
  // Error handling can be applied passing in a callback when executing socket methods on or emit
  var on = function (eventName, callback) {
    socket.on(eventName, function () {  
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(socket, args);
      });
    });
  };

  var emit = function (eventName, data, callback) {
    socket.emit(eventName, data, function () {
      var args = arguments;
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




