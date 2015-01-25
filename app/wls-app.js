'use strict';

// Declare app level module which depends on views, and components
angular.module('wlsApp', [
  	'wlsApp.services',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls'
])
.config(['$stateProvider', '$urlRouterProvider', 
		  	function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	.otherwise('/index');

	$stateProvider
		.state('index', {
			url: "/index",
			views: {
				"state" : { templateUrl: "partials/main_state.html",}
			}
		})
		.state('route1', {
			url: "/route1",
			views: {
				"state" : { templateUrl: "partials/stocklist.html",}
			}
		})
		.state('route2', {
			url: "/route2",
			views: {
				"state" : { templateUrl: "partials/stock.html", }
			}
		})
}])
.controller('MainCtrl', function($scope, $window, apiService) {
	$scope.mainVar = 'HERE';
    var handleSuccess = function(data, status) {
    $scope.stocks = data;
    console.log('STOCKS', $scope.stocks);
  };
	$scope.stocks  = apiService.fetchStocks()
          .success(handleSuccess);

    var handleStockSuccess = function(data, status) {
    console.log('STOCK', data);
  };
    $scope.showCurrentStock = function(_id) {
    $scope.currentStock = apiService.fetchCurrentStock(_id)
    .success(handleStockSuccess);
  }; 
});