angular.module('App', [])
.controller('Hello', function($scope, $http) {
    $http.get('http://localhost:8080/tasks/').
        then(function(response) {
            $scope.greeting = response.data;
        });
});