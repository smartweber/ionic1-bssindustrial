(function() {
	'use strict';

	angular
		.module('barebone.rewards', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.rewards', {
				url: '/rewards',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/rewards/rewards-form.html',
						// controller: 'LoginController as vm'
						controller: 'RewardsController as vm'
					}
				}
			});
		});
})();