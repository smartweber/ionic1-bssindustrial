(function() {
	'use strict';

	angular
		.module('barebone.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = [
		'menuItems',
		'homeDataService',
		'externalAppsService',
		'$cordovaEmailComposer',
		'$timeout',
		'motion',
		'$scope'
	];

	

	/* @ngInject */
	function HomeController(menuItems, homeDataService, externalAppsService, $cordovaEmailComposer, $timeout, motion, $scope) {

	    $scope.$on('$ionicView.loaded', function() {
            ionic.Platform.ready( function() {
                if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
            });
        });

		var vm = angular.extend(this, {
			entries: menuItems,
			phoneNumber: homeDataService.phoneNumber,
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage
		});

		(function activate() {
			motion.collapseHeader();
			motion.ink();

			$timeout(function() {
				ionic.material.motion.fadeSlideInRight({
					startVelocity: 3000
				});
			}, 200);
		})();

		// **********************************************************
		function getDirections() {
			externalAppsService.openMapsApp(homeDataService.officeLocation);
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: homeDataService.email,
					subject: 'Application Email Submission',
					body: ''
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openFacebookPage() {
			externalAppsService.openExternalUrl(homeDataService.facebookPage);
		}
	}
})();