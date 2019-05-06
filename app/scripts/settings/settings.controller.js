(function() {
	'use strict';

	angular
		.module('barebone.settings')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$scope', '$window', 'ApiEndpoint'];

	/* @ngInject */
	function SettingsController($scope, $window, ApiEndpoint) {
		$scope.pushMode = true;
		var pushmode = $window.localStorage['pushmode'];
		if (typeof pushmode != 'undefined') {
			if (pushmode == 'yes') {
				$scope.pushMode = true;
			} else {
				$scope.pushMode = false;
			}
		} else {
			$scope.pushMode = true;
		}
		
		/*$scope.pushNotificationChange = function() {
			if ($scope.pushMode == false) {
				window.parsePlugin.unsubscribe('BSSChannel', function(msg) {
					alert(msg);
					$window.localStorage['pushmode'] = 'no';
				});
			} else {
				$window.localStorage['pushmode'] = 'yes';
				window.parsePlugin.initialize(ApiEndpoint.appId, ApiEndpoint.clientKey,
											  function() {
					//alert('Parse initialized successfully.');
				
					window.parsePlugin.subscribe('BSSChannel', function() {
						alert('Successfully subscribed to SampleChannel.');
				
						window.parsePlugin.getInstallationId(function(id) {
							// update the view to show that we have the install ID
							//alert('Retrieved install id: ' + id);
					
						}, function(e) {
							//alert('Failure to retrieve install id.');
						});
				
					}, function(e) {
						//alert('Failed trying to subscribe to SampleChannel.');
					});
				
				}, function(e) {
					//alert('Failure to initialize Parse.');
				});
			}
		};*/
	}
})();