function getParam(paramName, def) {
    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)
    return params.get(paramName) || def
}

function loadDialect($scope) {
    let lang = getParam('lang', storage.getString(storageKeys.language, navigator.language.split("-")[0]))
    let scriptTag = document.createElement('script');
    scriptTag.src = "/mfm-wallet/strings/lang/" + lang + ".js";
    scriptTag.onload = function () {
        $scope.str = window.str
        $scope.$apply()
    }
    document.body.appendChild(scriptTag)
}

function controller(callback) {
    let app = angular.module("App", ['ngMaterial', 'ngAnimate'])
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.disableTheming();
    })
    app.controller("Controller", function ($scope, $mdBottomSheet, $mdDialog, $mdToast) {
        window.$mdToast = $mdToast
        window.$mdBottomSheet = $mdBottomSheet
        window.$mdDialog = $mdDialog
        addGlobalVars($scope, callback)
        loadDialect($scope)
    })
}

function addGlobalVars($scope, callback) {
    addFormats($scope)
    addNavigator($scope)
    $scope.wallet = window.wallet
    $scope.str = window.str
    $scope.bank_address = "bank"
    callback($scope)
}

function showDialog(templateUrl, onClose, callback) {
    setTimeout(function () {
        window.$mdDialog.show({
            templateUrl: templateUrl,
            escapeToClose: false,
            multiple: true,
            controller: function ($scope) {
                addGlobalVars($scope, callback)
            }
        }).then(function (result) {
            if (onClose)
                onClose(result)
        })
    }, 100)
}

function showBottomSheet(templateUrl, onClose, callback) {
    setTimeout(function () {
        window.$mdBottomSheet.show({
            templateUrl: templateUrl,
            escapeToClose: false,
            controller: function ($scope) {
                addGlobalVars($scope, callback)
            }
        }).then(function (result) {
            if (onClose)
                onClose(result)
        })
    }, 100)
}


function showMessage(message, toastClass, callback) {
    if (message == null) message = ""
    let spaceCount = message.split(' ').length + 1
    let delay = spaceCount / 4 * 1000
    if (delay < 1000) delay = 1000
    if (delay > 5000) delay = 5000
    if (window.$mdToast != null) {
        window.$mdToast.show(window.$mdToast.simple()
            .toastClass(toastClass)
            .textContent(message)
            .hideDelay(delay))
    }
    if (callback)
        callback(message)
}

function showError(message, error) {
    showMessage(message, 'red-toast', error)
}

function showSuccess(message, success) {
    showMessage(message, 'green-toast', success)
}

function setMarkdown(divId, text) {
    try {
        var defaults = {};
        defaults.highlight = function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {
                }
            } else {
                return '<pre class="hljs"><code>'
                    + md.utils.escapeHtml(str)
                    + '</code></pre>';
            }
        }
        let md = window.markdownit(defaults)
        document.getElementById(divId).innerHTML = md.render(text);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function clearFocus(){
    let tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
}
