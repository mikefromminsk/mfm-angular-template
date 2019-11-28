controller("launcher", function ($scope) {
    $scope.message = "";
    $scope.hello_world = "";

    $scope.save = function () {
        $scope.hello_world = $scope.message;
    }
})