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
		.state('edit', {
			url: "/edit",
			views: {
				"state" : { templateUrl: "partials/edit_stock.html", }
			}
		})
}])
.controller('MainCtrl', function($scope, $window, $state, apiService) {
	$scope.mainVar = 'HERE';

	//----------------- STOCK LIST ----------------------
    var handleStockListSuccess = function(data, status) {
    $scope.stocks = data;
    console.log('STOCKS', $scope.stocks);
  };
	$scope.stocks  = apiService.fetchStocks()
          .success(handleStockListSuccess);

    var handleShowStockSuccess = function(data, status) {
    	$scope.currentStock = data;
    	var stockPage = 'stock';
    	$state.go(stockPage);
  };

	//----------------- SHOW STOCK  ----------------------
    $scope.showCurrentStock = function(_id) {
    $scope.currentStock = apiService.fetchCurrentStock(_id)
    .success(handleShowStockSuccess);
  	};

  	var handleInsertStockSuccess = function(data, status) {
  		console.log('STATUS', status);
  		$scope.stocks = apiService.fetchStocks()
          .success(handleStockListSuccess);
    	$state.go('list');
  	};

	//----------------- ADD STOCK  ----------------------
  	$scope.insertStock = function(name) {
    apiService.insertStock(name)
    .success(handleInsertStockSuccess);
  	}; 

	//----------------- DELETE STOCK  ----------------------
  	var handleDeleteStockSuccess = function(data, status) {
  		console.log('STATUS', status);
  		$scope.stocks = apiService.fetchStocks()
          .success(handleStockListSuccess);
    	$state.go('list');
  	};

  	$scope.deleteStock = function(_id) {
    	apiService.deleteStock(_id)
    	  .success(handleDeleteStockSuccess);
  	};


	//----------------- EDIT STOCK  ----------------------
	var handleEditStockSuccess = function(data, status) {
  		console.log('STATUS', status);
  		console.log('DATA', data);
  		$scope.stocks = apiService.fetchStocks()
          .success(handleStockListSuccess);
    	$state.go('list');
  	};

	$scope.editStock = function(_id, name) {
    	apiService.editStock(_id, name)
    	  .success(handleEditStockSuccess);
  	};
}); 