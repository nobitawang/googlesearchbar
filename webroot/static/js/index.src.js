/*global $ window alert document*/
'use strict';

var pixTestApp = angular.module('PixTestApp', ['ngRoute'], function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'static/template/main.html',
        controller:'SearchBarCtrl'
    }).otherwise({
        redirectTo: '/'
    });
}).controller('SearchBarCtrl', ['$scope', function($scope) {
    $scope.textBox = '';
    $scope.ctrlClass = {
        'borderBule':true
    };

    $scope.toggleBarClass = function(ans) {
        $scope.ctrlClass.borderBule = ans;
    }

    $scope.makeRequest = function() {


        console.log($scope.textBox);
    }

}]);
/*
$(document).ready(function () {
    var myScope   = $('#articles'),
        textbox   = $('.textbox:last', myScope),
        suggest   = $('.textbox.suggest', myScope),
        searchBar = $('.search-bar', myScope),
        ul        = $('.result ul', myScope),
        clearBar  = function () {
            ul.parent().hide();
            suggest[0].value = '';
        };

    textbox.on({
        'keyup': function (event) {
            var _this = this,
                key   = event.keyCode;

            if (1 > _this.value.length) {
                clearBar();
                return;
            }

            switch (key) {
                case 38:
                case 40:
                    var selLI     = $('.selected', ul),
                        item      = $('li', ul),
                        direction = (38 === key) ? -1 : 1,
                        index,
                        target;
                    if (0 > selLI.length) {
                        index = selLI.index() + direction;
                        index = (0 > index) ? item.length - 1 : index;
                        index = (item.length <= index) ? 0 : index;
                        selLI.removeClass('selected');
                    } else {
                        index = 0;
                    }
                    target = $('li:eq(' + index + ')', ul).addClass('selected');
                    textbox.val(target.text());
                    return;
                case 39:
                    if (0 < suggest[0].value.length) {
                        textbox.val(suggest[0].value);
                        suggest[0].value = '';
                    }
                    break;
                default :
            }

            $.getJSON('static/data/data.json', {'query':_this.value})
            .done(function (data) {
                var r      = data.result,
                    html   = '',
                    makeLI = function (str) {
                        var tmp;
                        if (0 !== str.indexOf(_this.value)) {
                            clearBar();
                            return '';
                        }
                        tmp = str.replace(_this.value, '<span>' + _this.value + '</span>');
                        return '<li>'+ tmp + '</li>';
                    };
                if (0 === r.length) {
                    clearBar();
                    return;
                }
                for (var i = 0, m = r.length; i < m; i += 1) {
                    html += makeLI(r[i]);
                }
                if ('' !== html) {
                    ul.html(html).parent().show();
                    suggest[0].value = $('li:first', ul).text();
                } else {
                    clearBar();
                }
            });
        },
        'focus' : function () {
            searchBar.addClass('borderBule');
        },
        'blur' : function () {
            searchBar.removeClass('borderBule');
        }
    }).focus();

    ul.on('click', 'li', function () {
        textbox.val($(this).text());
        clearBar();
    });

    ul.on('mouseenter', 'li', function () {
        $('li', ul).removeClass('selected');
        $(this).addClass('selected');
    });
});
*/