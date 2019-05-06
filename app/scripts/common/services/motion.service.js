(function() {
	'use strict';

	angular
		.module('barebone.common')
		.service('motion', motion);

	motion.$inject = ['$timeout', '$rootScope'];

	/* @ngInject */
	function motion($timeout, $rootScope) {
		var service = {
			showItems: showItems,
			expandHeader: expandHeader,
			collapseHeader: collapseHeader,
			ink: ink
		};
		return service;

		// **************************************************

		function showItems(selector, interval) {
			selector = selector || '.animate-fade-slide-in-right .item';
			interval = interval || 200;

			$timeout(function() {
				ionic.material.motion.fadeSlideIn({
					selector: selector
				});
			}, interval);
		}

		function expandHeader() {
			$rootScope.$broadcast('header-expanded', {
				expanded: true
			});
		}

		function collapseHeader() {
			$rootScope.$broadcast('header-expanded', {
				expanded: false
			});
		}

		function ink(ms) {
			ms = ms || 1000;
			$timeout(function() {
				ionic.material.ink.displayEffect();
			}, ms);
		}
	}
})();