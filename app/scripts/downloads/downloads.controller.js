(function() {
	'use strict';

	angular
		.module('barebone.downloads')
		.controller('DownloadsController', DownloadsController);

	DownloadsController.$inject = ['$scope', 'downloadsService', '$timeout', 'motion'];

	/* @ngInject */
	function DownloadsController($scope, downloadsService, $timeout, motion) {
		var vm = angular.extend(this, {
			downloads: [],
			doRefresh: doRefresh
		});

		motion.expandHeader();
		// ******************************************************

		downloadsService.all(function(data) {
			vm.downloads = data;
			//vm.products.title = vm.products.title.replace(/(<([^>]+)>)/ig,"");
			$timeout(function() {
				ionic.material.motion.fadeSlideInRight({
					selector: '.animate-fade-slide-in .item'
				});
			}, 200);
		});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}
	}
})();