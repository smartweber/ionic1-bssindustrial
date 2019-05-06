// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'config',
    'barebone.menu',
    'barebone.products',
    'barebone.downloads',
    'barebone.home',
    'barebone.drupal',
    'barebone.vimeo',
    'gMaps',
    'barebone.branchfinder',
    'barebone.contact',
    'barebone.signup',
    'barebone.newsletter',
    'barebone.login',
    'barebone.mailus',
    'barebone.rewards',
    'ngIOS9UIWebViewPatch',
    // 'ngCordova',
    'ionic.native',
    'ngMap',
    'barebone.twitter',
    'barebone.library'
])

.value('_', window._)
    .constant('ApiEndpoint', {
        //  url: 'http://localhost:8100/api/'
        url: 'https://feeder.shadowsvault.com/'
    })
    .constant('KeysConsts', {
        admobKey: 'ca-app-pub-1983077777811335/3889364200',
        admobKeyIOS: 'ca-app-pub-3029977594125274/6015053149',
        admobKeyAndroid: 'ca-app-pub-3029977594125274/1584853540'
    })
    .constant('EmailConsts', {
        toquotation: 'enquiries@bssgroup.com',
        tocontact: 'enquiries@bssgroup.com',
        tosignup: 'enquiries@bssgroup.com',
        tonewsletter: 'rewards@bssgroup.com',
        from: 'rewards@bssgroup.com',
        subject: 'BSS App Contact Submission'
    })
    .constant('BaseUrlConsts', {
        //serviceBaseUrl: 'http://dev-rewards.pantheon.io/',
        serviceBaseUrl: 'https://www.bss-rewards.co.uk/',
        localStoragePrefix: 'drupal_'
    })
    .run(function($ionicPlatform, $rootScope, $location, $timeout, $ionicPopup, $cordovaDeeplinks) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                            title: "No Network Detected",
                            content: "This application requires a network connection to run."
                        })
                        .then(function(result) {
                            if (!result) {
                                ionic.Platform.exitApp();
                            }
                        });
                } else {

                    initPushwoosh();
                }
            }

            if (window.cordova) {
                $cordovaDeeplinks.route({
                    '/news/:articleId': {
                        target: 'app/drupal-articles',
                        parent: 'app/drupal-articles'
                    },
                    '/products/:productId': {
                        target: 'app/product',
                        parent: 'app/products'
                    },
                    '/libraries/:pdfId': {
                        target: 'app/library-posts',
                        parent: 'app/home'
                    }
                }).subscribe(function(match) {
                    $location.path(match.$route.parent);
                    $timeout(function() {
                        if (match.$args) {
                            if (match.$args.hasOwnProperty('articleId')) {
                                $location.path(match.$route.target + '/' + match.$args.articleId);
                            } else if (match.$args.hasOwnProperty('productId')) {
                                $location.path(match.$route.target + '/' + match.$args.productId);
                            }
                        } else {
                            $location.path(match.$route.target);
                        }
                    }, 200);
                    
                }, function(nomatch) {
                    console.warn('No match', nomatch);
                });
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (window.AdMob) {
                AdMob.hideBanner();
            }
        });
    })



.config(function($ionicConfigProvider, $urlRouterProvider, $httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        // $httpProvider.defaults.withCredentials = true;

        $ionicConfigProvider.views.maxCache(0);
        $urlRouterProvider.otherwise('/app/home');
    })
    .directive('browseTo', function($ionicGesture) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var handleTap = function(e) {
                    // Possible: capture Google Analytics here
                    var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_blank', 'location=yes');
                };
                var tapGesture = $ionicGesture.on('tap', handleTap, $element);
                $scope.$on('$destroy', function() {
                    // Clean up - unbind drag gesture handler
                    $ionicGesture.off(tapGesture, 'tap', handleTap);
                });
            }
        }
    });
