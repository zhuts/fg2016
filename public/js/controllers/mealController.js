angular.module('mealController', [])

  // inject the Todo service factory into our controller
  .controller('mainController', function($scope, $http, Courses) {
    $scope.formData = {};
    $scope.loading = true;

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Courses.get()
      .success(function(data) {
        $scope.mealData = data;
        $scope.loading = false;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.addMeal = function() {
      $scope.loading = true;

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.mealData.name != undefined) {

        // call the create function from our service (returns a promise object)
        Todos.create($scope.mealData)

          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data; // assign our new list of todos
          });
      }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteMeal = function(id) {
      $scope.loading = true;

      Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
        .success(function(data) {
          $scope.loading = false;
          $scope.todos = data; // assign our new list of todos
        });
    };
  });