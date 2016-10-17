'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'AWSS3Service', function($scope, AWSS3Service) {
  var files = []
  AWSS3Service.listItems().then(function(result){
    for (let value of result.Contents) {
      AWSS3Service.getUrl(value.Key).then(function(url){
        files.push({key:value.Key, url:url});
      });
    }
    $scope.fileList = files;
  });
}]);
