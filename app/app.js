'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).controller('NavCtrl', function ($scope, $window, $location) {

  $scope.navItems = [
    { name:'View files', href:"#!/view1"},
    { name:'Upload files', href: "#!/view2"}
  ];

  $scope.isActive = function (viewLocation) {
      console.log('$location.path(): ', $location.path());
      return viewLocation === $location.path();
  };

  $scope.isCollapsed = true;

});
