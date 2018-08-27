angular.module("App", []).controller("Hello", function($scope, $http) {
  $http.get("http://localhost:8080/tasks/").then(function(response) {
    $scope.tasks = response.data;
  });

  function genericSuccess(res) {
    return res.data.data; 
  }

  $scope.add = function(tasks) {
    return $http
      .post("http://localhost:8080/tasks", tasks)
      .then(function(success) {
        load();
        return genericSuccess(success);
        
      });
  };

  var load = function() {
    $http.get("http://localhost:8080/tasks/").then(function(response) {
      $scope.tasks = response.data;
    });
  };

});
