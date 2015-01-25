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
		.state('list', {
			url: "/list",
			views: {
				"state" : { templateUrl: "partials/stocklist.html",}
			}
		})
		.state('stock', {
			url: "/stock",
			views: {
				"state" : { templateUrl: "partials/stock.html", }
			}
		})
		.state('add', {
			url: "/add",
			views: {
				"state" : { templateUrl: "partials/add_stock.html", }
			}
		})
}])
.controller('MainCtrl', function($scope, $window, $state, apiService) {
	$scope.mainVar = 'HERE';
    var handleSuccess = function(data, status) {
    $scope.stocks = data;
    console.log('STOCKS', $scope.stocks);
  };
	$scope.stocks  = apiService.fetchStocks()
          .success(handleSuccess);

    var handleStockSuccess = function(data, status) {
    	$scope.currentStock = data;
    	var stockPage = 'stock';
    	$state.go(stockPage);
  };
    $scope.showCurrentStock = function(_id) {
    $scope.currentStock = apiService.fetchCurrentStock(_id)
    .success(handleStockSuccess);
  };

  	var handleInsertStockSuccess = function(data, status) {
  		console.log('STATUS', status);
  		$scope.stocks = apiService.fetchStocks()
          .success(handleSuccess);
    	$state.go('list');
  	};

  	$scope.insertStock = function(name) {
    apiService.insertStock(name)
    .success(handleInsertStockSuccess);
  }; 
});