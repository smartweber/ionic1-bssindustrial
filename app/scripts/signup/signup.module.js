(function() {
	'use strict';

	angular
		.module('barebone.signup', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.signup', {
				url: '/signup',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/signup/signup-form.html',
						controller: 'SignUpController as vm'
					}
				}
			});
		});
})();