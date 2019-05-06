(function() {
	'use strict';

	angular
		.module('barebone.twitter', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.twitter', {
				url: '/twitter',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/twitter/twitter.html',
						controller: 'TwitterController as vm'
					}
				}
			});
		});
})();