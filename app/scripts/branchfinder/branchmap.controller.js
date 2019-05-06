(function() {
	'use strict';

	angular
		.module('barebone.branchfinder')
		.controller('BranchMapController', BranchMapController);

	BranchMapController.$inject = ['$scope', 'branchfinderService', 'motion'];

	/* @ngInject */
	function BranchMapController($scope, branchfinderService, motion) {
		
		$scope.$on('mapInitialized', function (event, map) {
			$scope.map = map;
		});
		
		$scope.yelp = branchfinderService;
		
		
		$scope.showBranchDetail = function (event, branch) {
			$scope.yelp.branch = branch;
			$scope.map.scope.showInfoWindow.apply(this, [event, 'marker-info']);
		};
		
		$scope.getDirections = function (branch) {
			console.log('Getting directions for branch');
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
		
		/*var markers = [];
		
		var vm = angular.extend(this, {
			origin: {
				lat: $stateParams.latitude,
				lon: $stateParams.longitude
			},
			zoom: 15,
			markers: []
		});
		
		markers.push({
			name: $stateParams.title,
			lat: $stateParams.latitude,
			lon: $stateParams.longitude
		});
		 
		vm.markers = markers;		 

		motion.expandHeader();*/
		
		
	}
})();