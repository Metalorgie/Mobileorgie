'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('MetalorgieMobile', ['ionic', 'config', 'MetalorgieMobile.controllers', 'MetalorgieMobile.services', 'MetalorgieMobile.filters'])

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
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
  .state('tab.news', {
      url: '/news',
      views: {
          'tab-news': {
              templateUrl: 'templates/tab-news.html',
              controller: 'NewsCtrl'
          }
      }
  })
  .state('tab.news-detail', {
      url: '/news/:newsId',
      views: {
          'tab-news': {
              templateUrl: 'templates/news-detail.html',
              controller: 'NewsDetailCtrl'
          }
      }
  })
  .state('tab.band-detail', {
      url: '/groupe/:slug',
      views: {
          'tab-band': {
              templateUrl: 'templates/band-detail.html',
              controller: 'BandDetailCtrl'
          }
      }
  })
  .state('tab.album-detail', {
      url: '/band/:slug/album/:id',
      views: {
          'tab-band': {
              templateUrl: 'templates/album-detail.html',
              controller: 'AlbumCtrl'
          }
      }
  })
  .state('tab.lives', {
      url: '/lives',
      views: {
          'tab-lives': {
              templateUrl: 'templates/tab-lives.html',
              controller: 'LivesCtrl'
          }
      }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news');

})
    .run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(typeof analytics !== "undefined") {
                analytics.startTrackerWithId("UA-340766-1");
            } else {
                console.log("Google Analytics Unavailable");
            }
        });
    });

