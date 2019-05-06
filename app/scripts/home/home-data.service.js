(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('homeDataService', homeDataService);

	homeDataService.$inject = [];

	/* @ngInject */
	function homeDataService() {
		return {
			phoneNumber: '0330 123 3522',
			email: 'mediahackers@gmail.com',
			officeLocation: '13,45',
			facebookPage: 'https://www.facebook.com/ionicframework'
		};
	}
})();