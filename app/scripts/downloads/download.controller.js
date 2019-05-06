(function() {
	'use strict';

	angular
		.module('barebone.downloads')
		.controller('DownloadController', DownloadController);

	DownloadController.$inject = ['$scope', '$stateParams', 'downloadsService', 'motion'];

	/* @ngInject */
	function DownloadController($scope, $stateParams, downloadsService, motion) {
		var vm = angular.extend(this, {
			download: null
		});

		motion.expandHeader();
		// **********************************************

		var downloadId = $stateParams.downloadId;

		downloadsService.get(downloadId)
			.then(function(download) {
				vm.download = download;
				//vm.product.title = vm.product.title.replace(/(<([^>]+)>)/ig,"");
			});
		}
})();