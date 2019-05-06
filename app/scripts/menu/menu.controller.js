(function() {
	'use strict';

	angular
		.module('barebone.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['$scope', '$state', '$rootScope', '$ionicHistory', '$location', '$ionicViewService'];

	/* @ngInject */
	function MenuController($scope, $state, $rootScope, $ionicHistory, $location, $ionicViewService) {
		$rootScope.loginSuccess = false;
		var vm = angular.extend(this, {
			isExpanded: false
		});
		/*
		$rootScope.$on("$ionicView.afterLeave", function () {
			$ionicHistory.clearCache();
		});
		*/
		$scope.showRewards = function () {
			$ionicViewService.nextViewOptions({
				disableBack: true
			});
			if($rootScope.loginSuccess) {
				$location.path('/app/rewards');
			} else {
				$location.path('/app/login');
				// $state.go('app.rewards');
			}
			// var ref = window.open('http://www.bssindustrial.co.uk/Technical-Information/Material-Safety-Datasheets', '_system', 'location=yes');
		};

		$scope.$on('header-expanded', function(event, args) {
			vm.isExpanded = args.expanded;
		});

		$rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
			// evt.preventDefault();
		    // console.log('State changed from ' + fromState.name + ' to: ' + toState.name);
		    
		});
	}
})();