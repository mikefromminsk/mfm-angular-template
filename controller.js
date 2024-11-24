function getProfile(domain, success, error) {
    postContract("mfm-token", "profile.php", {
        domain: domain,
        address: wallet.address(),
    }, success, error)
}

function main($scope) {
    let domain = getParam("domain")

    // has to be in navigator.js
    $scope.openDialogExample = function ($event) {
        window.angularEvent = $event
        openDialogExample()
    }

    $scope.openBottomSheetExample = function () {
        openBottomSheetExample()
    }


    function init() {
        loadProfile()
    }

    function loadProfile() {
        getProfile(domain, function (response) {
            $scope.token = response
            $scope.$apply()
        })
    }

    init()
}