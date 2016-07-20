(function(){
	var app = angular.module('myApp',[]);
	app.controller('myController',function($rootScope, $http, $location, $scope){
		$scope.word="salita";
		var authenticate = function(credentials, callback) {
//			console.log(credentials.username + " | " + credentials.password);
			var headers = credentials ? {
				authorization : "Basic "
						+ btoa(credentials.username + ":"
								+ credentials.password)
			} : {};

			$http.get('user', {
				headers : headers
			}).then(function(response) {
				if (response.data.name) {
					$rootScope.authenticated = true;
				} else {
					$rootScope.authenticated = false;
				}
				callback && callback($rootScope.authenticated);
			}, function() {
				$rootScope.authenticated = false;
				callback && callback(false);
			});

		}

		authenticate();

		$scope.credentials = {};
		$scope.login = function() {
			console.log("1");
			authenticate($scope.credentials, function(authenticated) {
				console.log($scope.credentials);
				if (authenticated) {
					console.log("Login succeeded")
					$location.path("/");
					$scope.error = false;
					$rootScope.authenticated = true;
				} else {
					console.log("Login failed")
					$location.path("/login");
					$scope.error = true;
					$rootScope.authenticated = false;
				}
			})
		};

		$scope.logout = function() {
			$http.post('logout', {}).finally(function() {
				$rootScope.authenticated = false;
				$location.path("/");
			});
		}
	});
})();