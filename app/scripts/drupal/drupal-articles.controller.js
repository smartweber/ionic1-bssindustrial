(function() {
	'use strict';

	angular
		.module('barebone.drupal')
		.controller('DrupalArticlesController', DrupalArticlesController);

	DrupalArticlesController.$inject = ['$state', 'drupalService', 'motion', 
										'KeysConsts', '$timeout'];

	/* @ngInject */
	function DrupalArticlesController($state, drupalService, motion, KeysConsts, $timeout) {
		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate
		});
		
		if(window.AdMob) {
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
			}, 20000);
		}

		(function activate() {
			getArticles().then(function() {
				motion.showItems();
				motion.ink();
			});
			motion.expandHeader();
		})();

		// ********************************************************************

		function getArticles() {
			return drupalService.getArticles()
				.then(function(articles) {
					vm.articles = articles;
				});
		}

		function navigate(articleId) {
			$state.go('app.drupal-article', { articleId: articleId });
		}
	}
})();