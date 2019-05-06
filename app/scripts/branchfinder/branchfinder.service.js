(function() {
	'use strict';

	angular
		.module('barebone.branchfinder')
		.factory('branchfinderService', branchfinderService);

	branchfinderService.$inject = ['$http', '$q', '$cordovaGeolocation', '$ionicPopup', 'ApiEndpoint'];

	/* @ngInject */
	function branchfinderService($http, $q, $cordovaGeolocation, $ionicPopup, ApiEndpoint) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 51.544440,
		'lon': -0.022974,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();
							
			ionic.Platform.ready(function () {
				var locurl = 'https://feeder.shadowsvault.com/branch-geolocator-test2/51.544440,-0.022974_600';
				$cordovaGeolocation
					.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
					.then(function (position) {
						self.lat = position.coords.latitude;
						self.lon = position.coords.longitude;
						self.distance = '_600';
						
						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.lon,
							dist: self.distance,
							
						};
						var locurl = ApiEndpoint.url+'branch-geolocator-test2/' + self.lat + ',' + self.lon + self.distance;
						$http.get(locurl)
							.success(function (data) {
								console.log(data);

								if (data.businesses.length == 0) {
									self.hasMore = false;
								} else {
									angular.forEach(data.businesses, function (business) {
										self.results.push(business);
									});
								}

								self.isLoading = false;
								deferred.resolve();
							})
							.error(function (data, status, headers, config) {
								self.isLoading = false;
								deferred.reject(data);
							});
					}, function (err) {
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title':'Please switch on geolocation',
							'template': "It seems like you've switched off geolocation for BSS Branch Locator, please switch it on by going to you application settings."
						});
						// $http.get(locurl)
						// 	.success(function (data) {
						// 		console.log(data);

						// 		if (data.businesses.length == 0) {
						// 			self.hasMore = false;
						// 		} else {
						// 			angular.forEach(data.businesses, function (business) {
						// 				self.results.push(business);
						// 			});
						// 		}

						// 		self.isLoading = false;
						// 		deferred.resolve();
						// 	})
						// 	.error(function (data, status, headers, config) {
						// 		self.isLoading = false;
						// 		deferred.reject(data);
						// 	});
					});
			});

			return deferred.promise;
		}
	};

	self.load();

	return self;

	}
})();