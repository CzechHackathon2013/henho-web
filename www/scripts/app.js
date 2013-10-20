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
  'ui.calendar',
  'ui.bootstrap.modal'
]);

henho.config(function ($routeProvider) {
    $routeProvider
      .when('/meeting/done', {
        templateUrl: 'views/meeting-done.html'
      })
      .when('/meeting/error', {
        templateUrl: 'views/meeting-error.html'
      })
      .when('/meeting/:id', {
        templateUrl: 'views/meeting.html',
        controller: MeetingCtrl
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: MainCtrl
      })
      .otherwise({
        redirectTo: '/'
      });
  });

henho.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.useXDomain = true;
});