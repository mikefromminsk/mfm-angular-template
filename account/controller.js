function openAccount(success) {
    window.$mdDialog.show({
        templateUrl: '/angular-example2/account/index.html',
        controller: function ($scope) {
            addFormats($scope)
        }
    }).then(function () {
        if (success)
            success()
    })
}