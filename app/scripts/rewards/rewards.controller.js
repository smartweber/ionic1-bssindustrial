(function() {
	'use strict';

    angular
		.module('barebone.rewards')
		.controller('RewardsController', RewardsController);
	RewardsController.$inject = ['$rootScope', '$scope', '$state', 'loginService', '$ionicLoading', '$ionicViewService'];

	function RewardsController($rootScope, $scope, $state, loginService, $ionicLoading, $ionicViewService) {
		$scope.pageTitle ='<div class="title-image"><img src=\"images/avatar.png\"></div>';
		$scope.resultStr = "";

		$scope.getRewards = function () {
			$ionicLoading.show();

		    loginService.getRewards($rootScope.token, $rootScope.rewardsUID).then(function(data) {
		      	$ionicLoading.hide();
		      	if(data.Points.length > 0) {
		      		var rewardsData = data.Points[0];
		      		$scope.resultStr = 
		      		'<br /><br />Your Account Representative is ' + rewardsData['Account Rep Name'] + '.<br /><br />' +
		      		'You\'ve reached ' + rewardsData['Percentage Reached Tier 1'] + '% at Tier 1 from a target spend of £' + rewardsData['Tier 1 Target'] + '.<br /><br />' +
		      		'You\'ve reached ' + rewardsData['Percentage Reached Tier 2'] + '% at Tier 2 from a target spend of £' + rewardsData['Tier 2 Target'] + '.<br /><br />' +
		      		'Your total spend sum for the ' + rewardsData['Promotion'] + ' is £' + rewardsData['Total Spend Sum'] + '.';
		      	} else {
		      		$scope.resultStr = 'You are not a registered BSS User.';
		      	}
		      	console.log(JSON.stringify(data.Points[0]));
		    }, function(error) {
		      	$ionicLoading.hide();
		      	console.log(error);
		    });
		};


		$scope.logOut = function () {
			
		    $ionicLoading.show();

		    loginService.logout($rootScope.token).then(function() {
		      	$rootScope.loginSuccess = false;
		      	$scope.loginError = false;

		      	loginService.removeUserData();

		      	$ionicLoading.hide();
		      	$ionicViewService.nextViewOptions({
					disableBack: true
				});
		      	$state.go('app.home');
		    }, function(error) {
		      	$ionicLoading.hide();
		      	console.log(error);
		    });
		};

		$scope.getRewards();
	}
})();