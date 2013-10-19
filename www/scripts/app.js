'use strict';
angular.module('henho.filter', []);
angular.module('henho.directive', []);
//angular.module('henho.controller', []);
angular.module('henho.service', ['ngResource']);

var henho = angular.module('henho', [
  'henho.filter',
  'henho.directive',
  'henho.service',
  'ngSanitize',
  'ui.calendar'
]);

henho.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

henho.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.useXDomain = true;
});