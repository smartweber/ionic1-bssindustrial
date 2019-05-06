(function() {
	'use strict';

	angular
		.module('barebone.mailus', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.mailus', {
				url: '/mailus',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/mailus/mailus-form.html',
						controller: 'MailUsController as vm'
					}
				}
			});
		});
})();