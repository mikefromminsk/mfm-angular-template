controller("test", function ($scope, $routeParams) {
    $scope.buttonLabel = "Button " + ($routeParams.arg1 || "none");
})