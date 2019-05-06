(function() {
	'use strict';

    angular
		.module('barebone.login')
		.controller('LoginController', LoginController);
	LoginController.$inject = ['$rootScope', '$scope', '$state', 'loginService', '$ionicPopup', '$ionicLoading', '$location', '$ionicViewService'];


	function LoginController($rootScope, $scope, $state, loginService, $ionicPopup, $ionicLoading, $location, $ionicViewService) {
		$scope.pageTitle = '<div class="title-image"><img src=\"images/avatar.png\"></div>';
		// $scope.pageTitle = "<div class='title-image'></div>";
		$scope.formData = {
			username: '',
			password: ''
		};
		$scope.loginError = false;
		$scope.login = function (formContent) {
		    if(!formContent.$valid) {
			    return;
		    }
		   //  $ionicViewService.nextViewOptions({
					// 	disableBack: true
					// });
					// $location.path('/app/rewards');
		    $ionicLoading.show();
		    loginService.getSessionToken().then(function(token) {
		      	$rootScope.token = token;
		      	console.log("token: " + token);
		      	loginService.login($scope.formData.username, $scope.formData.password).then(function(data) {
			        $ionicLoading.hide();

			        $scope.loginError = false;
			        $rootScope.loginSuccess = true;
			        $rootScope.token = data.token;
			        $rootScope.session_name = data.session_name;
			        loginService.setUserData(data.user, data.token);
				    console.log('user: ' + JSON.stringify(data.user));
				    $rootScope.rewardsUID = data.user.uid;
				    $rootScope.userName = data.user.name;
				    $rootScope.accountNumber = data.user.field_bss_account_number.und[0].value;
				    $rootScope.companyName = data.user.field_user_company_name.und[0].value;
				    $ionicViewService.nextViewOptions({
						disableBack: true
					});
					$location.path('/app/rewards');
		      	}, function(error) {
			        $ionicLoading.hide();
			        $scope.loginError = error;
			        console.log('error data: ' + JSON.stringify(error));
			        if(error == 'Wrong username or password.') {
			        	openFailureDialog();
					}
		      	});
		    }, function(error) {
		      	$ionicLoading.hide();
		      	console.log('error: ' + error);
		      	
		    });

			var openFailureDialog = function() {
				var myPopup = $ionicPopup.show({
				    template: 'User/Password incorrect, Please try again.',
				    title: 'Login Failure!',
				    cssClass: 'email-popup',
				    buttons: [
				      	{ text: 'CLOSE' }
				    ]
				});
			  	myPopup.then(function(res) {
			    	console.log('Tapped!', res);
			  	});
			};
		};
	}
})();