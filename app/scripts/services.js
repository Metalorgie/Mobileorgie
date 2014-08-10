'use strict';
angular.module('MetalorgieMobile.services', [])

.factory('News', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'news.php';
    return {
        news: [],
        last: function() {
            return this.find(0,40);
        },
        find:function(start, nb){
            var deferred = $q.defer();
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?start=' + start + '&limit=' + nb})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    alert("Error");
                });

            return deferred.promise;
        },
        get: function(newsId) {
            var deferred = $q.defer();
            var filters = [{property:'id', value:newsId}];
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters)})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    alert("Error");
                });
            return deferred.promise;
        }
    };
}])

.factory('Lives', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'lives.php';
    return {
        lives: [],
        incoming: function() {
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
        get: function(id) {
            var deferred = $q.defer();
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filters[id]=' + id})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    alert("Error");
                });
            return deferred.promise;
        }
    };
}])
;
