angular.module('homechef.services', [])

.factory('dishes', function ($resource, API_URL) {
  return $resource(API_URL + '/dishes', {});
});
