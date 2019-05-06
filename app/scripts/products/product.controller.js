(function() {
	'use strict';

	angular
		.module('barebone.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['$scope', '$stateParams', 'productsService', 'motion', 'KeysConsts', '$timeout'];

	/* @ngInject */
	function ProductController($scope, $stateParams, productsService, motion, KeysConsts, $timeout) {
		var vm = angular.extend(this, {
			product: null
		});

		motion.expandHeader();
		// **********************************************
		
		if(window.cordova) {
			var admobid;
				
			if (device.platform == "Android") {
				admobid = { // for Android
					banner: KeysConsts.admobKeyAndroid
				};
			} else {
				admobid = { // for iOS
					banner: KeysConsts.admobKeyIOS
				};
			}
		}
		
		
		
		var productId = $stateParams.productId;

		productsService.get(productId)
			.then(function(product) {
				vm.product = product;
				//vm.product.title = vm.product.title.replace(/(<([^>]+)>)/ig,"");
			});
		}
})();