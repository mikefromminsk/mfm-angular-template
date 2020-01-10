controller("helloworld", function ($scope, $routeParams) {
    $scope.message = $routeParams.arg1;
})