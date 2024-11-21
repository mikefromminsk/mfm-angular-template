function getParam(paramName) {
    var uri = window.location.search.substring(1)
    var params = new URLSearchParams(uri)
    return params.get(paramName)
}

function controller(callback) {
    let app = angular.module("App", ['ngMaterial', 'ngAnimate'])
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.disableTheming();
    })
    app.controller("Controller", function ($scope, $mdBottomSheet, $mdDialog, $mdToast) {
        addFormats($scope)
        addNavigator($scope)
        window.$mdToast = $mdToast
        window.$mdBottomSheet = $mdBottomSheet
        window.$mdDialog = $mdDialog
        callback($scope)
    })
}

function showDialog(templateUrl, onClose, controller) {
    window.$mdDialog.show({
        templateUrl: templateUrl,
        escapeToClose: false,
        multiple: true,
        controller: function ($scope) {
            addFormats($scope)
            addNavigator($scope)
            controller($scope)
        }
    }).then(function (result) {
        if (onClose)
            onClose(result)
    })
}

function showBottomSheet(templateUrl, onClose, controller) {
    window.$mdBottomSheet.show({
        templateUrl: templateUrl,
        escapeToClose: false,
        controller: function ($scope) {
            addFormats($scope)
            addNavigator($scope)
            controller($scope)
        }
    }).then(function (result) {
        if (onClose)
            onClose(result)
    })
}

function showError(message, error) {
    if (error) {
        error(message)
    } else {
        if (window.$mdToast != null) {
            window.$mdToast.show(window.$mdToast.simple().toastClass('red-toast').textContent(message))
        } else {
            alert(message)
        }
    }
}

function showSuccess(message, success) {
    if (window.$mdToast != null) {
        window.$mdToast.show(window.$mdToast.simple().toastClass('green-toast').textContent(message))
    } else {
        alert(message)
    }
    if (success)
        success(message)
}

function animateFocus(id) {
    document.getElementById(id).animate(
        [
            {transform: "translateY(0px)"},
            {transform: "translateY(1px)"},
            {transform: "translateY(-1px)"},
            {transform: "translateY(0px)"},
        ],
        {
            duration: 300,
            iterations: 5,
        },
    )
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