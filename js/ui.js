function controller(callback) {
    let app = angular.module("App", ['ngMaterial', 'ngAnimate'])
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.disableTheming();
    })
    app.controller("Controller", function ($scope, $mdBottomSheet, $mdDialog, $mdToast) {
        addFormats($scope)
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
            controller($scope)
        }
    }).then(function (result) {
        if (onClose)
            onClose(result)
    })
}


function selectFile(success, accept) {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = accept || "*/*"
    input.onchange = e => {
        if (success != null)
            success(e.target.files[0])
    }
    input.click()
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

function objectToForm(data) {
    var formData = new FormData();
    angular.forEach(data, function (value, key) {
        formData.append(key, value);
    });
    return formData;
}

function downloadFile(uri) {
    var link = document.createElement("a");
    link.setAttribute('download', uri.split(/(\\|\/)/g).pop());
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
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

function setFocus(id) {
    setTimeout(function () {
        document.getElementById(id).focus()
    }, 500)
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

async function loadMarkdown(divId, url) {
    try {
        const response = await fetch(url);
        const text = await response.text();

        var defaults = {
            html: false, // Enable HTML tags in source
            xhtmlOut: false, // Use '/' to close single tags (<br />)
            breaks: false, // Convert '\n' in paragraphs into <br>
            langPrefix: 'language-', // CSS language prefix for fenced blocks
            linkify: true, // autoconvert URL-like texts to links
            typographer: true, // Enable smartypants and other sweet transforms
            // options below are for demo only
            _highlight: true, // <= THIS IS WHAT YOU NEED
            _strict: false,
            _view: 'html' // html / src / debug
        };

        defaults.highlight = function (str, lang) {
            var esc = md.utils.escapeHtml;
            console.log(str)
            console.log(lang)
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {}
            }else{
                return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';
            }

        };

        let md = window.markdownit(defaults)
        document.getElementById(divId).innerHTML = md.render(text);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}