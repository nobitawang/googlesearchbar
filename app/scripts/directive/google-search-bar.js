'use strict'
var googleSearchBar = angular.module('pixtestwebYApp');
googleSearchBar.directive('googlesearchbar', [function() {
    return {
        restrict: 'E',
        templateUrl: '../../views/template/google-search-bar.html',
        scope: {
            gsbAction: '@gsbAction'
        },
        controller: ['$scope', '$http', function ($scope, $http) {
            var getEmptyArray = function(def, length) {
                var arr = [],
                i;
                for (i = length; i--;) {
                    arr.push(def);
                }
                return arr;
            };

            $scope.selNumber     = -1;
            $scope.textBox       = '';
            $scope.isHidden      = true;
            $scope.filteredItems = [];
            $scope.result        = [];
            $scope.ctrlClass     = {
                'borderBlue'  :false
            };
            $scope.itemSelected  = getEmptyArray('', $scope.filteredItems.length);


            $scope.setSelected   = function(n, isClear) {
                $scope.itemSelected    = getEmptyArray('', $scope.filteredItems.length);
                if (isClear) {
                    n = -1;
                } else {
                    $scope.itemSelected[n] = 'selected';
                }
                $scope.selNumber = n || 0;
            };
            $scope.chooseItem   = function(index) {
                $scope.textBox = $scope.filteredItems[index];
                $scope.filteredItems = [];
                $scope.clearResult();
            };

            $scope.toggleBarClass = function(ans) {
                $scope.ctrlClass.borderBlue = ans;
            }

            $scope.clearResult = function() {
                $scope.isHidden = true;
                $scope.result   = [];
                $scope.setSelected(-1, true);
            }

            $scope.autoComplate = function() {
                var no      = $scope.selNumber,
                    keyCode = window.event.keyCode,
                    resLen  = $scope.filteredItems.length;

                switch (keyCode) {
                    case 38:
                    case 40:
                        no = no + ((40 === keyCode) ? 1 : -1) ;
                        no = (0 <= no) ? no : resLen - 1;
                        no = (resLen > no) ? no : 0;
                        $scope.setSelected(no);
                        return;
                    case 39:
                        if ($scope.filteredItems.length > 0) {
                            $scope.textBox = $scope.filteredItems[0];
                            $scope.filteredItems = [];
                        }
                        break;
                    case 13:
                        if (-1 !== $scope.selNumber) {
                            $scope.chooseItem(no);
                        } else {
                            $scope.formSubmit();
                        }
                        return;
                    default:
                }
            }

            $scope.chkHidden = function() {
                return ($scope.filteredItems.length <= 0 || $scope.isHidden)
            }

            $scope.makeUp = function(str) {
                return str.replace($scope.textBox, '<span>' + $scope.textBox + '</span>');
            }

            $scope.makeRequest = function() {
                if ($scope.textBox === '') {
                    $scope.clearResult();
                    return;
                }
                $http.get($scope.gsbAction + '?key=' + $scope.textBox).success(function(data) {
                    if (0 < data.result.length) {
                        $scope.result   = data.result;
                        $scope.isHidden = false;
                    } else {
                        $scope.clearResult();
                    }
                }).error(function() {
                    //console.log('Server error !!');
                });
            }

            $scope.formSubmit = function() {
                $scope.clearResult();
                //unfinished
            };
        }],
        link: function(scope, elem, attrs, ctrl) {
            var textbox = elem.find('.textbox:last');
            textbox.on({
                'focus':function() {
                    scope.toggleBarClass(true);
                },
                'blur':function() {
                    scope.toggleBarClass(false);
                }
            })
            textbox.focus();


        }
    };

}]);
