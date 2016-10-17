'use strict';

angular.module('myApp.view2', ['ngRoute', 'ngFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'Upload', 'AWSS3Service', function($scope, Upload, AWSS3Service) {

  $scope.uploadFiles = function (files) {
      $scope.Files = files;
      if (files && files.length > 0) {
        angular.forEach($scope.Files, function (file, key) {
          AWSS3Service.uploadItem(file).then(function (result) {
              // Mark as success
              file.Success = true;
          }, function (error) {
              // Mark the error
              $scope.Error = error;
          }, function (progress) {
              // Write the progress as a percentage
              file.Progress = (progress.loaded / progress.total) * 100
          });
        });
      }
    };

}]);
