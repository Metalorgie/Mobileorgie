'use strict';
angular.module('MetalorgieMobile.controllers', [])

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('NewsCtrl', function($scope, News, dividerFilter) {
        if(typeof analytics !== "undefined") { analytics.trackView("News Controller"); }
        $scope.newsByDay = [];
        $scope.news = [];
        $scope.loading = false;
	    $scope.noMoreItemsAvailable = false;

        $scope.loadMore = function() {
            if (!$scope.loading) {
                $scope.loading = true;
                var newsPromise = News.find($scope.news.length, 40);
                newsPromise.then(function (result) {  // this is only run after $http completes
                    $scope.news.push.apply($scope.news, result);
                    $scope.newsByDay = dividerFilter($scope.news, 'date');
                    if ($scope.news.length >= 2000) {
                        $scope.noMoreItemsAvailable = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
                if (typeof analytics !== "undefined") {
                    analytics.trackEvent('News', 'LoadMore');
                }
                $scope.loading = false;
            }
        };

        $scope.doRefresh = function() {
            var newsPromise = News.find(0, 40);
            newsPromise.then(function(result) {  // this is only run after $http completes
                $scope.news.push.apply($scope.news, result);
                $scope.newsByDay = dividerFilter($scope.news, 'date');
                $scope.$broadcast('scroll.refreshComplete');
            });
            if(typeof analytics !== "undefined") { analytics.trackEvent('News', 'DoRefresh'); }
        };

        /*var newsPromise = News.last();
        newsPromise.then(function(result) {  // this is only run after $http completes
            $scope.news = result;
            $scope.newsByDay = dividerFilter($scope.news, 'date');
        });*/
})

.controller('NewsDetailCtrl', function($scope, $stateParams, News, $sce) {
    if(typeof analytics !== "undefined") { analytics.trackView("News Detail Controller"); }
    var newsDetailPromise = News.get($stateParams.newsId);
    newsDetailPromise.then(function(result) {
        $scope.news = result;
        if (typeof $scope.news.videos != 'undefined') {
            var length = $scope.news.videos.length;
            for (var i = 0; i < length; i++) {
                $scope.news.videos[i].embedUrl = $sce.trustAsResourceUrl($scope.news.videos[i].embedUrl)
            }
        }
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

.controller('LivesCtrl', function($scope, Lives, $cordovaGeolocation, $ionicPopup, City) {
    $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            var livesPromise = Lives.incoming(lat, long);
            livesPromise.then(function(result) {  // this is only run after $http completes
                $scope.lives = result;
            });
        }, function(err) {
            // error
        });

        $scope.data = {};
        $scope.cities = [];

        $scope.searchCity = function() {
            var cityPromise = City.search($scope.data.city);
            cityPromise.then(function(result) {
                $scope.cities = result;
            });
        };

        var popup = null;

        $scope.showChooseCity = function() {
            // An elaborate, custom popup
            popup = $ionicPopup.show({
                templateUrl: 'templates/popup-choose-city.html',
                title: 'Choisissez une ville',
                subTitle: 'Taper le nom de la ville',
                scope: $scope,
                buttons: [
                    { text: 'Annuler' }
                ]
            });
            popup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.chooseCity = function(city) {
            var livesPromise = Lives.incoming(city.lat, city.long);
            livesPromise.then(function(result) {
                $scope.lives = result;
                popup.close();
            });
        };
})
.controller('LiveDetailCtrl', function($scope, $stateParams, Lives) {
    var liveDetailPromise = Lives.get($stateParams.id);
    liveDetailPromise.then(function(result) {
        $scope.live = result;
    });
})

.controller('ReleasesCtrl', function($scope, Releases, $filter) {
    var releasesPromise = Releases.incoming();
    releasesPromise.then(function(releases) {
        $scope.releases = {};
        var contactsLength = releases.length;
        for (var i = 0; i < contactsLength; i++) {
            var dateStr = $filter('date')(releases[i].date, "dd/MM/yyyy");
            if(!$scope.releases[dateStr]) {
                $scope.releases[dateStr] = [];
            }

            $scope.releases[dateStr].push ( releases[i] );
        }
        console.log($scope.releases);
    });
})

.controller('ArticlesCtrl', function($scope, Articles) {
    if(typeof analytics !== "undefined") { analytics.trackView("Articles Controller"); }
    $scope.articles = [];
    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function() {
        var articlesPromise = Articles.find($scope.articles.length, 20);
        articlesPromise.then(function(result) {  // this is only run after $http completes
            $scope.articles.push.apply($scope.articles, result);
            if ( $scope.articles.length >= 200 ) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
        if(typeof analytics !== "undefined") { analytics.trackEvent('Articles', 'LoadMore'); }
    };

    $scope.getTypeName = function(article) {
        if (article.type == 'live-report') {
            return 'Live report';
        } else if (article.type == 'interview') {
            return 'Interview'
        } else if (article.type == 'report') {
            return 'Dossier'
        }
    };

    $scope.doRefresh = function() {
        var articlesPromise = Articles.find(0, 20);
        articlesPromise.then(function(result) {  // this is only run after $http completes
            $scope.articles.push.apply($scope.articles, result);
            $scope.$broadcast('scroll.refreshComplete');
        });
        if(typeof analytics !== "undefined") { analytics.trackEvent('Articles', 'DoRefresh'); }
    };

    var articlesPromise = Articles.last();
    articlesPromise.then(function(result) {  // this is only run after $http completes
        $scope.articles = result;
    });
})
.controller('ArticleDetailCtrl', function($scope, $stateParams, Articles) {
    var articleDetailPromise = Articles.get($stateParams.id);
    articleDetailPromise.then(function(result) {
        $scope.article = result;
    });
})

.controller('GalleriesCtrl', function($scope, Gallery) {
        if(typeof analytics !== "undefined") { analytics.trackView("Galleries Controller"); }
        $scope.galleries = [];
        $scope.loadMore = function() {
            var galleriesPromise = Gallery.latest($scope.galleries.length, 40);
            galleriesPromise.then(function(result) {  // this is only run after $http completes
                $scope.galleries.push.apply($scope.galleries, result);
                if ( $scope.galleries.length == 1000 ) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
            if(typeof analytics !== "undefined") { analytics.trackEvent('Galleries', 'LoadMore'); }
        };
    })

.controller('GalleryDetailCtrl', function($scope, $stateParams, $ionicModal, Gallery) {
        $scope.items = [];

        var galleryDetailPromise = Gallery.get($stateParams.id);
        galleryDetailPromise.then(function(result) {
            for(var i = 0; i < result.images.length; i++) {
                var image = result.images[i];
                $scope.items.push({
                    src: image.image,
                    thumb: image.thumbnails,
                    sub: image.bandName + '<em>(Vu ' + image.vu + ' fois)</em>'
                });
            }
            $scope.items.push.apply($scope.items, items);
            if ( $scope.items.length == 1000 ) {
                $scope.noMoreItemsAvailable = true;
            }
        });
})

;
