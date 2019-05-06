(function() {
	'use strict';

    angular
		.module('barebone.contact')
		.controller('TwitterController', TwitterController)
		.filter('ukDate', function () {
        return function (date) {
            var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
    	    day = '' + d.getDate(),
        	year = d.getFullYear();

		    if (month.length < 2) month = '0' + month;
    		if (day.length < 2) day = '0' + day;

    		return [year, month, day].join('/');
        };
})
// .filter('converttolinks', function() {
//   return function(text) {
//     if (text) {
//         text = text.replace(
//             /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
//             function(url){
//                 var full_url = url;
//                 if (!full_url.match('^https?:\/\/')) {
//                     full_url = 'http://' + full_url;
//                 }
//                 return '<a href="' + full_url + '">' + url + '</a>';
//                 //return "<a href=\"#\" onclick=\"window.open('" + full_url + "', '_blank\', 'location=yes');\">" + url + "</a>";
               
//             }
//         );
//     }
//     return text;
//   };
// });
.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "href=\"#\" onClick=\"window.open('$1', '_blank', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});
	TwitterController.$inject = ['$scope', '$http'];


	function TwitterController($scope, $http) {
		$scope.pageTitle = '<div class="title-image"><img src=\"images/avatar.png\"></div>';
		// $scope.pageTitle = '<div class='title-image'></div>';
		 
		$scope.tweets = [];
		var url = 'https://feeder.shadowsvault.com/twitter-proxy/index.php';
		$http.get(url)
			.success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.tweets = data;
				console.log(data);
			})
			.error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log('ERROR (Products):' + status);
			});
	}
})();



