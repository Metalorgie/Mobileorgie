'use strict';
angular.module('MetalorgieMobile.controllers', [])

.controller('NewsCtrl', function($scope, News) {
    var newsPromise = News.last();
    newsPromise.then(function(result) {  // this is only run after $http completes
        $scope.news = result;
    });
})

.controller('NewsDetailCtrl', function($scope, $stateParams, News) {

})

.controller('UpcomingAlbumCtrl', function($scope) {

})

.controller('LivesCtrl', function($scope) {

})

.controller('BandsCtrl', function($scope) {

});
