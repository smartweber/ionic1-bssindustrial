(function() {
	'use strict';

	angular
		.module('barebone.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', 'productsService', '$timeout', 'motion', 'KeysConsts'];

	/* @ngInject */
	function ProductsController($scope, productsService, $timeout, motion, KeysConsts) {
		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh
		});

		motion.expandHeader();
		// ******************************************************
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
			
			$timeout(function(){
				AdMob.createBanner( {
					adId: admobid.banner,
					autoShow: true,
					bgColor: 'black',
					position: AdMob.AD_POSITION.BOTTOM_CENTER
				});
			}, 2000);
		}
	
		productsService.all(function(data) {
			vm.products = data;
			//vm.products.title = vm.products.title.replace(/(<([^>]+)>)/ig,"");
			$timeout(function() {
				ionic.material.motion.fadeSlideInRight({
					selector: '.animate-fade-slide-in .item'
				});
			}, 200);
		});

		function doRefresh() {
			setTimeout($scope.$broadcast('scroll.refreshComplete'), 16000);
		}
	}
})();