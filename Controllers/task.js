
/*
    Declara o nome do Módulo, e seu controller.
  */
angular.module("App", []).controller("TaskController", function($scope, $http) {
  $http.get("http://localhost:8080/tasks/").then(function(response) {
    $scope.tasks = response.data;
    $scope.salvar = true;
  });

  function genericSuccess(res) {
    return res.data.data;
  }

  /*
    Adicionando nova Task
  */
  $scope.add = function(tasks) {
    return $http
      .post("http://localhost:8080/tasks", tasks)
      .then(function(success) {
        load();
        clear();
        return genericSuccess(success);
      });
  };

  /*
    Deletando task selecionada por id
  */
  $scope.delete_task = function(id) {
    var url = "http://localhost:8080/tasks/" + id;
    $http.delete(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  /*
    Coloca como modo de edição
  */
  $scope.editMode = function(t) {
    $scope.task = t;
    $scope.salvar = false;
  };

  /*
    Salva alteração de uma Task
  */
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

  /*
    Coloca task como concluída
  */
  $scope.concluir = function(id) {
    var url = "http://localhost:8080/tasks/finish/" + id;
    $http.put(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  /*
    Desfaz a task de Concluída para Pendente
  */
  $scope.desfazer = function(id) {
    var url = "http://localhost:8080/tasks/undo/" + id;
    $http.put(url).then(
      function(response) {
        load();
      },
      function(response) {}
    );
  };

  /*
    Limpa formulário
  */
  var clear = function() {
    $scope.formulario.$setUntouched();
    $scope.formulario.$setPristine();
    $scope.task = {};
  };

  /*
    Cancela modo de edição e limpa formulário
  */
  $scope.cancel = function(t) {
    clear();
    $scope.salvar = true;
  };    

  /*
    Atualiza tasks
  */
  var load = function() {
    $http.get("http://localhost:8080/tasks/").then(function(response) {
      $scope.tasks = response.data;
    });
  };
});
