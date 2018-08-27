angular.module("App", []).controller("Hello", function($scope, $http) {
  $http.get("http://localhost:8080/tasks/").then(function(response) {
    $scope.tasks = response.data;
    $scope.salvar = true;
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

  $scope.delete_task = function(id) {
    var url = "http://localhost:8080/tasks/" + id;
    $http.delete(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  $scope.editMode = function(t) {
    $scope.task = t;
    $scope.salvar = false;
  };

  $scope.edit_save = function(t) {
    var url = "http://localhost:8080/tasks/" + t.id;
    $http.put(url, t).then(
      function(response) {
        load();
      },
      function(response) {}
    );
    $scope.salvar = true;
    clear();
  };

  $scope.concluir = function(id) {
    var url = "http://localhost:8080/tasks/finish/" + id;
    $http.put(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  $scope.desfazer = function(id) {
    var url = "http://localhost:8080/tasks/undo/" + id;
    $http.put(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  var clear = function() {
    $scope.task = [];
  };

  $scope.cancel = function(t) {
    $scope.task = [];
    $scope.salvar = true;
  };

  var load = function() {
    $http.get("http://localhost:8080/tasks/").then(function(response) {
      $scope.tasks = response.data;
    });
  };
});
