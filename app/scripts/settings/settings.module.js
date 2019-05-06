(function() {
	'use strict';

	angular
		.module('barebone.settings', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.settings', {
				url: '/settings',
				views: {
					'menuContent': {
						templateUrl: 'scripts/settings/settings.html',
						controller: 'SettingsController as vm'
					}
				}
			});
		});
})();