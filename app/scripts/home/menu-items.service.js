(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'News',
			path: 'drupal-articles',
			icon: 'ion-speakerphone'
		}, {
			title: 'Our Services',
			path: 'products',
			icon: 'ion-information-circled'
		}, {
			title: 'Get a Quotation',
			path: 'contactus',
			icon: 'ion-ios-help'
		}, {
			title: 'Branch Finder',
			path: 'branchfinderlist',
			icon: 'ion-map'
		}];

		return data;
	}
})();