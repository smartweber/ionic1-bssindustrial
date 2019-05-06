(function() {
	'use strict';

    angular
		.module('barebone.branchfinder')
		.controller('BranchfinderListController', BranchfinderListController);
	BranchfinderListController.$inject = ['$scope', 'branchfinderService', '$state', 'motion'];


	function BranchfinderListController($scope, branchfinderService, $state, motion) {
		
		$scope.yelp = branchfinderService;

		$scope.doRefresh = function () {
			if (!$scope.yelp.isLoading) {
				$scope.yelp.refresh().then(function () {
					$scope.$broadcast('scroll.refreshComplete');
				});
			}
		};
		

		$scope.loadMore = function () {
			console.log('loadMore');
			if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
				$scope.yelp.next().then(function () {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}
		};

		$scope.getDirections = function (branch) {
			//alert(branch.Latitude);
			
			//var coor = branch.Coordinates.split(",");
			
			//$state.go('app.branchmap', {title: branch.Branch, latitude:coor[0] ,longitude: coor[1]});
			var destination = [
				branch.Latitude,
				branch.Longitude
			];

			var source = [
				$scope.yelp.lat,
				$scope.yelp.lon
			];

			launchnavigator.navigate(destination, source);
		};
	
	}
})();