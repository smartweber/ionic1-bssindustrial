(function() {
	'use strict';

	angular
		.module('barebone.newsletter', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.newsletter', {
				url: '/newsletter',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/bssnewsletter/newsletter-form.html',
						controller: 'NewsletterController as vm'
					}
				}
			});
		});
})();