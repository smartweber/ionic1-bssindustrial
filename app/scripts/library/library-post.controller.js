(function() {
	'use strict';

	angular
		.module('barebone.library')
		.controller('LibraryPostController', LibraryPostController);

	LibraryPostController.$inject = [
		'$stateParams', '$ionicActionSheet', '$cordovaSocialSharing', 'libraryService', 'motion', '$timeout', 'KeysConsts'];

	/* @ngInject */
	function LibraryPostController(
		$stateParams, $ionicActionSheet, $cordovaSocialSharing, libraryService, motion, $timeout, KeysConsts) {

		var articleId = $stateParams.articleId;

		var vm = angular.extend(this, {
			article: null,
			share: share
		});

		function activate() {
			loadArticle();
			motion.expandHeader();
		}
		activate();
		
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
					position: AdMob.position.BOTTOM_CENTER
				});
			}, 20000);
		}
			
			

		// ********************************************************************

		function loadArticle() {
			drupalService.getArticle(articleId)
				.then(function(article) {
					vm.article = article;
					console.log("NEWS FEED: " + JSON.stringify(article));
				});
		}

		function share() {
			$ionicActionSheet.show({
				buttons: [
					{ text: 'Facebook' },
					{ text: 'Twitter' },
					{ text: 'Email' },
					{ text: 'Share' }
				],
				titleText: 'Share',
				cancelText: 'Cancel',
				buttonClicked: function(index) {
					switch(index) {
						case 0:
							shareToFacebook();
							break;
						case 1:
							shareToTwitter();
							break;
						case 2:
							shareViaEmail();
							break;
						case 3:
							shareNative();
							break;
					}
					return true;
				}
			});
		}

		function shareNative() {
			var message = vm.article.title;
			var subject = vm.article.title;

			$cordovaSocialSharing
				.share(message, subject, null, vm.article.url);
		}

		function shareToFacebook() {
			var message = vm.article.title;
			var image = vm.article.image;
			var link = vm.article.url;

			$cordovaSocialSharing
				.shareViaFacebook(message, image, link);
		}

		function shareToTwitter() {
			var message = vm.article.title + ' ' + vm.article.url;
			var image = vm.article.image;
			var link = vm.article.url;

			$cordovaSocialSharing
				.shareViaTwitter(message, image, link);
		}

		function shareViaEmail() {
			var message = 'Read more about "' + vm.article.title + '" ' + vm.article.url;
			var subject = vm.article.title;

			$cordovaSocialSharing
				.shareViaEmail(message, subject, [], [], [], null);
		}
	}
})();