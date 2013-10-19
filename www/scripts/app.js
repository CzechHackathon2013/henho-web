'use strict';

angular.module('henhoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.calendar'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('henhoApp')
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });