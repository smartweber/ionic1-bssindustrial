(function() {
	'use strict';

	angular
		.module('barebone.library', [
			'ionic',
			'barebone.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.library-posts', {
					url: '/library-posts',
					views: {
						'menuContent': {
							templateUrl: 'scripts/library/library-posts.html',
							controller: 'LibraryPostsController as vm'
						}
					}
				})
				.state('app.library-post', {
					url: '/library-posts/:postId',
					views: {
						'menuContent': {
							templateUrl: 'scripts/library/library-post.html',
							controller: 'LibraryPostController as vm'
						}
					}
				});
		});
})();