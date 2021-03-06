(function() {
	'use strict';

	angular
		.module('barebone.home', [
			'ionic',
			'ngCordova',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					cache: false,
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();