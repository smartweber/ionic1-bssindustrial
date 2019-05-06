(function() {
	'use strict';

	angular
		.module('barebone.contact', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.contactus', {
				url: '/contactus',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/contactus/contact-form.html',
						controller: 'ContactUsController as vm'
					}
				}
			});
		});
})();