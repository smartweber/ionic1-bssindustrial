(function() {
	'use strict';

	angular
		.module('barebone.login', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.login', {
				url: '/login',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/login/login-form.html',
						controller: 'LoginController as vm'
					}
				}
			});
		});
})();