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

.controller('BandsCtrl', function($scope, Band) {
        if(typeof analytics !== "undefined") { analytics.trackView("Bands Controller"); }

        $scope.bands = [];

        //if(typeof analytics !== "undefined") { analytics.trackView("Bands Controller"); }
        var bandsPromise = Band.latest(0,40);
        bandsPromise.then(function(result) {
            $scope.bands = result;
        });

        $scope.loadMore = function() {
            var bandsPromise = Band.latest($scope.bands.length, 40);
            bandsPromise.then(function(result) {  // this is only run after $http completes
                $scope.bands.push.apply($scope.bands, result);
                if ( $scope.bands.length == 10000 ) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
            if(typeof analytics !== "undefined") { analytics.trackEvent('Bands', 'LoadMore'); }
        };

        $scope.query = {term: ''};

        $scope.search = function() {
            if ($scope.query.term.length > 2) {
                var bandsPromise = Band.search($scope.query.term, 0, 40);
                bandsPromise.then(function(result) {  // this is only run after $http completes
                    $scope.bands = result;
                });
                if(typeof analytics !== "undefined") { analytics.trackEvent('Bands', 'Search'); }
            }
        };
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

.controller('LivesCtrl', function($scope, Lives, $cordovaGeolocation, $ionicPopup) {
    $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            var livesPromise = Lives.incoming(lat, long);
            livesPromise.then(function(result) {  // this is only run after $http completes
                $scope.lives = result;
            });

            console.log(lat);
            console.log(long);
        }, function(err) {
            // error
        });

        $scope.data = {};
        $scope.cities = {};

        $scope.searchCity = function() {
            //For test
            $scope.cities = [
                {name:'Paris', zip: '75000'},
                {name:'Nantes', zip: '44000'},
            ];
        };

        $scope.showChooseCity = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup-choose-city.html',
                title: 'Choisissez une ville',
                subTitle: 'Taper le nom de la ville',
                scope: $scope,
                buttons: [
                    { text: 'Annuler' },
                    {
                        text: '<b>Chercher</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.city) {
                                e.preventDefault();
                            } else {
                                return $scope.data.city;
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };
})
;
