(function() {
	'use strict';

	angular
		.module('barebone.library')
		.factory('libraryService', libraryService);

	libraryService.$inject = ['$http', '$q', '_', 'htmlToPlainText'];

	/* @ngInject */
	function libraryService($http, $q, _, htmlToPlainText) {
		var url = 'http://www.bsslibrary.co.uk';
		var posts = [];

		var service = {
			getCategories: getCategories,
			getAllPosts: getAllPosts,
			getCategoryPosts: getCategoryPosts,
			getLibraryPost: getLibraryPost
		};
		return service;

		////////////////

		function parseImgSrc(tag) {
			var match = tag.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
			return match[1];
		}

		function getCategories() {
			return $http.get(url + '/wp-json/taxonomies/category/terms');
		}

		function getAllPosts() {
			return $http.get(url + '/wp-json/posts?type=catalogue')
				.then(function(response) {
					posts = response.data;
					// posts = [];
					// _.each(response.data, function(item) {
					// 	posts.push({
					// 		id: item.nid,
					// 		title: item['node_title'],
					// 		brief: item.teaser,
					// 		image: parseImgSrc(item.image),
					// 		content: item.body,
					// 		tags: item.tags
					// 	});
					// });
					return posts;
				});
		}

		function getLibraryPost(postId) {
			if (posts.length) {
				return $q.when(_.find(posts, 'ID', postId));
			} else {
				var deferred = $q.defer();

				getArticles()
					.then(function() {
						deferred.resolve(_.find(posts, 'ID', postId));
					});

				return deferred.promise;
			}
		}

		function getCategoryPosts(categoryId) {
			return $http.get(url + '/wp-json/posts?type=catalogue&filter[cat]=' + categoryId)
				.then(function(response) {
					posts = response.data;
					return posts;
				});
		}
	}
})();