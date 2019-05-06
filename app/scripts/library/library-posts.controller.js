(function() {
	'use strict';

	angular
		.module('barebone.library')
		.controller('LibraryPostsController', LibraryPostsController);

	LibraryPostsController.$inject = ['$state', 'libraryService', 'motion', 
										'KeysConsts', '$timeout', '$ionicLoading'];

	/* @ngInject */
	function LibraryPostsController($state, libraryService, motion, KeysConsts, $timeout, $ionicLoading) {
		var vm = angular.extend(this, {
			categories: [],
			posts: [],
			navigate: navigate,
			view: view,
			download: download,
			categorySelected: categorySelected,
			category: 'all'
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
			}, 10000);
		}

		(function activate() {
			getCategories();

			getPosts().then(function() {
				motion.showItems('.post');
				motion.ink();
			});
			motion.expandHeader();
		})();

		// ********************************************************************

		function getCategories() {
			libraryService.getCategories()
			.then(function(response) {
				vm.categories = response.data;
				// console.log('categories: ', vm.categories);
			});
		}

		function getPosts() {
			$ionicLoading.show();
			return libraryService.getAllPosts()
				.then(function(posts) {
					vm.posts = posts;
					// console.log('libraries: ', vm.posts);
					$ionicLoading.hide();
				}, function(error) {
					$ionicLoading.hide();
				});
		}

		function categorySelected(category) {
			libraryService.getCategoryPosts(category.ID)
			.then(function(posts) {
				vm.posts = posts;
				// console.log('category posts: ', vm.posts);
			});
		}

		function navigate(postId) {
			// $state.go('app.library-post', { postId: postId });
		}

		var options = {};
		var pdfLink = '';
		function view(post) {
			// body...
			if (!post.meta.catalogue_link) return;
			var fileTransfer = new FileTransfer();
			var uri = encodeURI(post.meta.catalogue_link.url);

			var store = cordova.file.dataDirectory;
			console.log('::: store location :::', store);
			var loc_array = post.meta.catalogue_link.url.split('/');
			var fileName = loc_array[loc_array.length-1];

			$ionicLoading.show();
			fileTransfer.download(
			    uri,
			    store + fileName,
			    function(entry) {
			    	$ionicLoading.hide();
			    	pdfLink = entry.toURL();
			        console.log("download complete: " + pdfLink);

			        // view document using cordova-document-viewer
			        cordova.plugins.SitewaertsDocumentViewer.canViewDocument(
			        	pdfLink, 'application/pdf', options, onPossible, onMissingApp, onImpossible, onError);
			    },
			    function(error) {
			    	$ionicLoading.hide();
			        console.log("download error source " + error.source);
			        console.log("download error target " + error.target);
			        console.log("download error code" + error.code);
			    },
			    false
			);
		}

		function onPossible() {
		  	window.console.log('document can be shown');
		  	//e.g. track document usage
		  	cordova.plugins.SitewaertsDocumentViewer.viewDocument(
    			pdfLink, 'application/pdf', options, onShow, onClose, onMissingApp, onError);
		}

		function onMissingApp(appId, installer)
		{
		    if(confirm("Do you want to install the free PDF Viewer App "
		            + appId + " for Android?"))
		    {
		        installer();
		    }
		}

		function onImpossible() {
		  	window.console.log('document cannot be shown');
		  	//e.g. track document usage
		}

		function onError(error) {
		  	window.console.log(error);
		  	alert("Sorry! Cannot show document.");
		}

		function onShow() {
		  	window.console.log('document shown');
		  	//e.g. track document usage
		}

		function onClose() {
		  	window.console.log('document closed');
		  	//e.g. remove temp files
		}

		function download(post) {
			// body...
			if (!post.meta.catalogue_link) return;
			var fileTransfer = new FileTransfer();
			var uri = encodeURI(post.meta.catalogue_link.url);

			var store = cordova.file.dataDirectory;
			console.log('::: store location :::', store);
			var loc_array = post.meta.catalogue_link.url.split('/');
			var fileName = loc_array[loc_array.length-1];

			$ionicLoading.show();
			fileTransfer.download(
			    uri,
			    store + fileName,
			    function(entry) {
			    	$ionicLoading.hide();
			        console.log("download complete: " + entry.toURL());
			    },
			    function(error) {
			    	$ionicLoading.hide();
			        console.log("download error source " + error.source);
			        console.log("download error target " + error.target);
			        console.log("download error code" + error.code);
			    },
			    false
			);
		}
	}
})();
