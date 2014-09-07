'use strict';
angular.module('MetalorgieMobile.controllers', [])

.controller('NewsCtrl', function($scope, News) {
    if(typeof analytics !== "undefined") { analytics.trackView("News Controller"); }
    $scope.news = [];

    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function() {
        var newsPromise = News.find($scope.news.length, 40);
        newsPromise.then(function(result) {  // this is only run after $http completes
            $scope.news.push.apply($scope.news, result);
            if ( $scope.news.length == 2000 ) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
        if(typeof analytics !== "undefined") { analytics.trackEvent('News', 'LoadMore'); }
    };

    $scope.doRefresh = function() {
        var newsPromise = News.find(0, 40);
        newsPromise.then(function(result) {  // this is only run after $http completes
            $scope.news.push.apply($scope.news, result);
            $scope.$broadcast('scroll.refreshComplete');
        });
        if(typeof analytics !== "undefined") { analytics.trackEvent('News', 'DoRefresh'); }
    };

    var newsPromise = News.last();
    newsPromise.then(function(result) {  // this is only run after $http completes
        $scope.news = result;
    });
})

.controller('NewsDetailCtrl', function($scope, $stateParams, News) {
    if(typeof analytics !== "undefined") { analytics.trackView("News Detail Controller"); }
    var newsDetailPromise = News.get($stateParams.newsId);
    newsDetailPromise.then(function(result) {
        $scope.news = result;
    });
})

.controller('BandDetailCtrl', function($scope, $stateParams, Band) {
    var bandDetailPromise = Band.get($stateParams.slug);
    bandDetailPromise.then(function(result) {
        $scope.band = result;
    });
})

.controller('AlbumCtrl', function($scope, $stateParams, Album) {
    var albumPromise = Album.get($stateParams.id);
        albumPromise.then(function(result) {
        $scope.album = result;
    });
})

.controller('ReleasesCtrl', function($scope) {

})

.controller('LivesCtrl', function($scope, Lives) {
    var livesPromise = Lives.incoming();
    livesPromise.then(function(result) {  // this is only run after $http completes
        $scope.lives = result;
    });
})

.controller('BandsCtrl', function($scope) {

});
