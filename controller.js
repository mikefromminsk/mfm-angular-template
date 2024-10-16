function main($scope) {

    $scope.openAccount = function () {
        openAccount()
    }

    var domain = getParam("domain")

    function init() {
        loadProfile()
    }

    function loadProfile() {
        postContract("mfm-wallet", "api/profile.php", {
            domain: domain,
            address: wallet.address(),
        }, function (response) {
            $scope.token = response
            $scope.$apply()
        })
    }

    init()
}