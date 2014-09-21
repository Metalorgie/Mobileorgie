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
                    console.log('Error');
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
                    console.log('Error');
                });
            return deferred.promise;
        }
    };
}])

.factory('Band', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'band.php';
    return {
        get: function(slug) {
            var deferred = $q.defer();
            var filters = [{property:'slug', value:slug}];
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters)})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    console.log('Error');
                });
            return deferred.promise;
        },
        latest: function(start, nb) {
            var deferred = $q.defer();
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?start=' + start + '&limit=' + nb})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    console.log('Error');
                });

            return deferred.promise;
        },
        search: function(query, start, nb) {
            var deferred = $q.defer();
            var filters = [{property:'name', value:query}];
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters) + '&start=' + start + '&limit=' + nb})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    console.log('Error');
                });

            return deferred.promise;
        }
    };
}])

.factory('Album', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'album.php';
    return {
        get: function(id) {
            var deferred = $q.defer();
            var filters = [{property:'id', value:id}];
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters)})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    console.log('Error');
                });
            return deferred.promise;
        }
    };
}])

.factory('Lives', ['$http', "$q", "ENV", function($http, $q, ENV) {
    var baseUrl = 'lives.php';
    return {
        lives: [],
        incoming: function(lat, long) {
            var deferred = $q.defer();
            var filters = [{property:'lat', value:lat}, {property:'long', value:long}];
            $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters)})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data, status) {
                    console.log('Error');
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
                    console.log('Error');
                });
            return deferred.promise;
        }
    };
}])

    .factory('City', ['$http', "$q", "ENV", function($http, $q, ENV) {
        var baseUrl = 'cities.php';
        return {
            search: function(name) {
                var deferred = $q.defer();
                var filters = [{property:'name', value:name}];
                $http({method : 'GET',url : ENV.apiEndpoint + baseUrl + '?filter=' + angular.toJson(filters)})//, headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}
                    .success(function(data, status) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status) {
                        console.log('Error');
                    });

                return deferred.promise;
            }
        };
    }])
;
