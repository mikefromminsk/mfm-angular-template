function openAccount(success) {
    showDialog('/angular-example/account/index.html', success, function ($scope) {
        addFormats($scope)
    })
}