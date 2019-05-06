(function() {
	'use strict';

	angular
		.module('barebone.branchfinder', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider

			.state('app.branchfinder', {
				url: '/branchfinderlist',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/branchfinder/branchfinder-list.html',
						controller: 'BranchfinderListController as vm'
					}
				}
			})
			.state('app.branchmap', {
				url: '/branchmap',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'scripts/branchfinder/branch-map.html',
						controller: 'BranchMapController as vm'
					}
				}
			});
		});
})();