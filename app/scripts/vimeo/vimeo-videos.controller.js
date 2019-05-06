(function() {
	'use strict';

	angular
		.module('barebone.vimeo')
		.controller('VimeoVideosController', VimeoVideosController);

	VimeoVideosController.$inject = ['$scope', '$state', '$ionicPopup', 'vimeoService', 'motion'];

	/* @ngInject */
	function VimeoVideosController($scope, $state, $ionicPopup, vimeoService, motion) {
		var userId = 'user46186054';

		var vm = angular.extend(this, {
			videos: [],
			navigate: navigate,
			refresh: refresh,
			loadMore: loadMore,
			moreItemsAvailable: true
		});

		(function activate() {
			motion.expandHeader();
			getVideos();
		})();
		// ********************************************************************

		function showItems() {
			motion.showItems();
			motion.ink();
		}

		function getVideos() {
			return vimeoService.getVideos(userId)
				.then(function(data) {
					vm.moreItemsAvailable = data.moreItemsAvailable;
					vm.videos = data.videos;
				}, function() {
					$ionicPopup.alert({
						title: 'No videos',
						template: 'No videos to display found'
					});
				})
				.then(showItems);
		}

		function refresh() {
			getVideos(userId).then(function(items) {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function loadMore() {
			return vimeoService.getMoreVideos(userId)
				.then(function(data) {
					vm.moreItemsAvailable = data.moreItemsAvailable;
					vm.videos = data.videos;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
				.then(showItems);
		}

		function navigate(video) {
			$state.go('app.vimeo-video', {
				videoId: video.id
			});
		}
	}
})();
