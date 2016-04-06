angular.module('moveList', [])
.controller('moveListController', ['$scope', 'redraw', function($scope) {
  $scope.items = [];

  $scope.reloadData = function() {
    console.log('test123');
    $scope.items = moveLog;
    // redraw($scope);
  };
}])
.factory('redraw', ['$window', function(){
  return function($scope) {
    console.log('big fat test');
  }
}]);
