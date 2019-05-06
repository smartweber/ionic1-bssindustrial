(function() {
	'use strict';

    angular
		.module('barebone.signup')
		.controller('SignUpController', SignUpController);
	SignUpController.$inject = ['$scope', '$state', 'motion', 'EmailConsts', '$ionicPopup', '$ionicViewService'];


	function SignUpController($scope, $state, motion, EmailConsts, $ionicPopup, $ionicViewService) {
		$scope.pageTitle = '<div class="title-image"><img src=\"images/avatar.png\"></div>';
		// $scope.pageTitle = '<div class='title-image'></div>';
		$scope.formData = {
			name: '',
			email: '',
			telephone: '',
			company: '',
			message: ''
		};

		$scope.sendEmail = function (formContent) {
			
		    if(!formContent.$valid) {
			    return;
		    }
		    
			var mailContentHTML = 
			'<div style="width:100%; background-color:#f3f7fc; padding: 50px;">' +
				'<div style="width:75%; background-color:white; margin:0 auto; padding:20px">' +
				'<h2>A registration request has been received from the BSS Mobile Application</h2>' +
				'<br>The message reads: <br><br>' +
				'<strong>Name</strong>: ' + $scope.formData.name + '<br>' +
				'<strong>Email</strong>: ' + $scope.formData.email + '<br>' +
				'<strong>Telephone</strong>: ' + $scope.formData.telephone + '<br>' +
				'<strong>Company</strong>: ' + $scope.formData.company + '<br><br>' +
				'<strong>Message</strong>: ' + $scope.formData.message +
				'</div>' +
			'</div>';

			var mailContentText = 'A registration request has been received from the BSS Mobile Application, the message reads:' +
								'Name: ' + $scope.formData.name + 
								' Email: ' + $scope.formData.email +
								' Telephone: ' + $scope.formData.telephone +
								' Company: ' + $scope.formData.company +
								' Message: ' + $scope.formData.message;
			var email = {
			  	'to' : EmailConsts.tosignup,
			  	'from' : EmailConsts.from,
			  	'subject' : EmailConsts.subject,
			  	'html' : mailContentHTML,
			  	'text' : mailContentText
			};

			sendgrid.send(email, function(result){
			    openSuccessDialog();
			}, function(error){
			    openFailureDialog();
			});
		};

		var openSuccessDialog = function() {
			var myPopup = $ionicPopup.show({
			    template: 'Your message has been sent and a member of our team will be in touch.',
			    title: 'Success!',
			    cssClass: 'email-popup',
			    buttons: [
			      	{ text: 'CLOSE' }
			    ]
			});
		  	myPopup.then(function(res) {
		    	console.log('Tapped!', res);
		    	$ionicViewService.nextViewOptions({
					disableBack: true
				});
		    	$state.go('app.home');
		  	});
		};

		var openFailureDialog = function() {
			var myPopup = $ionicPopup.show({
			    template: 'Your message has been failed to send.',
			    title: 'Failure!',
			    cssClass: 'email-popup',
			    buttons: [
			      	{ text: 'CLOSE' }
			    ]
			});
		  	myPopup.then(function(res) {
		    	console.log('Tapped!', res);
		  	});
		};
	}
})();