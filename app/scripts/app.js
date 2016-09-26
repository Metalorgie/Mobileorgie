'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('MetalorgieMobile', ['ionic', 'config', 'ngCordova', 'MetalorgieMobile.controllers', 'MetalorgieMobile.services', 'MetalorgieMobile.filters', 'ionic.rating', 'ion-gallery'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(typeof analytics !== "undefined") {
      analytics.startTrackerWithId("UA-340766-4");
    } else {
      console.log("Google Analytics Unavailable");
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })
  .state('app.news', {
      url: '/news',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-news.html',
              controller: 'NewsCtrl'
          }
      }
  })
  .state('app.news-detail', {
      url: '/news/:newsId',
      views: {
          'menuContent': {
              templateUrl: 'templates/news-detail.html',
              controller: 'NewsDetailCtrl'
          }
      }
  })
  .state('app.bands', {
      url: '/bands',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-bands.html',
              controller: 'BandsCtrl'
          }
      }
  })
  .state('app.band-detail', {
      url: '/band/:slug',
      views: {
          'menuContent': {
              templateUrl: 'templates/band-detail.html',
              controller: 'BandDetailCtrl'
          }
      }
  })
  .state('app.reviews', {
      url: '/reviews',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-reviews.html',
              controller: 'ReviewsCtrl'
          }
      }
  })
  .state('app.album-detail', {
      url: '/band/:slug/album/:id',
      views: {
          'menuContent': {
              templateUrl: 'templates/album-detail.html',
              controller: 'AlbumCtrl'
          }
      }
  })
  .state('app.lives', {
      url: '/lives',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-lives.html',
              controller: 'LivesCtrl'
          }
      }
  })
  .state('app.lives-details', {
      url: '/lives/:id',
      views: {
          'menuContent': {
              templateUrl: 'templates/live-detail.html',
              controller: 'LiveDetailCtrl'
          }
      }
  })
  .state('app.releases', {
      url: '/releases',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-releases.html',
              controller: 'ReleasesCtrl'
          }
      }
  })
  .state('app.articles', {
      url: '/articles',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-articles.html',
              controller: 'ArticlesCtrl'
          }
      }
  })
  .state('app.articles-details', {
      url: '/articles/:id',
      views: {
          'menuContent': {
              templateUrl: 'templates/article-details.html',
              controller: 'ArticleDetailCtrl'
          }
      }
  })
  .state('app.about', {
      url: '/about',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-about.html'
          }
      }
  })
  .state('app.galleries', {
      url: '/galleries',
      views: {
          'menuContent': {
              templateUrl: 'templates/tab-galleries.html',
              controller: 'GalleriesCtrl'
          }
      }
  })

  .state('app.gallery-details', {
          url: '/galleries/:id',
          views: {
              'menuContent': {
                  templateUrl: 'templates/gallery-detail.html',
                  controller: 'GalleryDetailCtrl'
              }
          }
      })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/news');

})
;

