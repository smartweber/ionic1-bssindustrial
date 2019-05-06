(function() {
  'use strict';

  angular
    .module('barebone.login')
    .factory('loginService', loginService);

  loginService.$inject = ['$http', '$q', '$rootScope', 'BaseUrlConsts'];

  /* @ngInject */
  function loginService($http, $q, $rootScope, BaseUrlConsts) {
    var loginEndpoint = 'api/remote_user/login.json',
      logoutEndpoint = 'api/remote_user/logout.json',
      registerEndpoint = 'api/remote_user/register',
      rewardsEndpoint = 'api/points',
      sessionTokenEndpoint = 'services/session/token';
    var self = {
      /*
       * Get services session token.
       */
      getSessionToken: function() {
        var defer = $q.defer();

        $http({
          method    : 'POST',
          url       : BaseUrlConsts.serviceBaseUrl + sessionTokenEndpoint
        })
        .success(function(data, status, headers, config) {
          defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          defer.reject(data);
        });

        return defer.promise;
      },

      /*
       * Get reward points.
       */
      getRewards: function(token, uid) {
        var defer = $q.defer();
        var tokenStr = (token ? token : $rootScope.token);

        $http({
          method    : 'POST',
          url       : BaseUrlConsts.serviceBaseUrl + rewardsEndpoint + "/" + uid,
          // withCredentials: true,
          headers: {
            'X-CSRF-Token': tokenStr,
            'Content-Type': 'application/json'

          }
        })
        .success(function(data, status, headers, config) {
          defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          defer.reject(data);
        });

        return defer.promise;
      },

      /*
       * Login User with username and password.
       */
      login: function(username, password, token) {
        var defer = $q.defer();
        var tokenStr = (token ? token : $rootScope.token);
        $http({
          method    : 'POST',
          url       : BaseUrlConsts.serviceBaseUrl + loginEndpoint,
          dataType  : 'json',
          data: {
            username: username,
            password: password
          },
          headers: {
            'X-CSRF-Token': tokenStr,
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
          }
        })
        .success(function(data, status, headers, config) {
          defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          defer.reject(data);
        });

        return defer.promise;
      },

      /*
       * Logout User.
       */
      logout: function(token) {
        var defer = $q.defer();
        var tokenStr = (token ? token : $rootScope.token);
        $http({
          method    : 'POST',
          url       : BaseUrlConsts.serviceBaseUrl + logoutEndpoint,
          dataType  : 'json',
          headers: {
            'X-CSRF-Token': tokenStr
          }
        })
        .success(function(data, status, headers, config) {
          defer.resolve(data);
        })
        .error(function(data, status, headers, config) {
          defer.reject(data);
        });

        return defer.promise;
      },

      /*
       * Save user credentials.
       */
      setUserData: function(user, token) {
        $rootScope.userData = user;
        $rootScope.token = token;

        window.localStorage.setItem(BaseUrlConsts.localStoragePrefix + 'token', token);
        window.localStorage.setItem(BaseUrlConsts.localStoragePrefix + 'user', user);
      },

       /*
       * Remove user credentials.
       */
      removeUserData: function() {
        $rootScope.userData = {};
        $rootScope.token = false;

        window.localStorage.removeItem(BaseUrlConsts.localStoragePrefix + 'token');
        window.localStorage.removeItem(BaseUrlConsts.localStoragePrefix + 'user');
      }
    };
    return self;
  }
})();