angular.module('henho.service').factory('Api', ['$resource', function ($resource) {
  var api = {};
  var url = 'http://henho.apiary.io';

  api.metting = $resource(url + '/meetings/:id', {id: '@id'}, {
    index: {method:'GET', isArray:true},
    show: {method:'GET'},
    create: {method: 'POST'}
  });

  api.acceptedTime = $resource(url + '/meetings/:id/accepted-times', {id: '@id'}, {
    create: {method: 'POST'}
  });


  return api;
}]);