(function() {
	'use strict';

	angular
		.module('barebone.downloads', [
			'ionic',
			'ngSanitize'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.downloads', {
					url: '/downloads',
					views: {
						'menuContent': {
							templateUrl: 'scripts/downloads/downloads.html',
							controller: 'DownloadsController as vm'
						}
					}
				})
				.state('app.download', {
					url: '/download/:downloadId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/downloads/download.html',
							controller: 'DownloadController as vm'
						}
					}
				});

		});

})();