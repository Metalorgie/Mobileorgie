'use strict';
angular.module('MetalorgieMobile.services', [])

.factory('News', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'news.php';
    return {
        news: [],
        last: function() {
            var deferred = $q.defer();
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    alert("Error");
                });

            return deferred.promise;
        },
        get: function(newsId) {
            //TODO
        }
    };
}]);
