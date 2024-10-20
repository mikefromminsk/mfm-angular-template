function main($scope) {

    $scope.openDialogExample = function () {
        openDialogExample()
    }

    $scope.openBottomSheetExample = function () {
        openBottomSheetExample()
    }

    var domain = getParam("domain")

    function init() {
        loadProfile()
    }

    function loadProfile() {
        postContract("mfm-token", "profile.php", {
            domain: domain,
            address: wallet.address(),
        }, function (response) {
            $scope.token = response
            $scope.$apply()
        })
    }

    init()
}