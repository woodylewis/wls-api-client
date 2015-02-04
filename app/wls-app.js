'use strict';

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
.controller('MainCtrl', ['$scope', '$window', '$state', 'apiService', function($scope, $window, $state, apiService) {
	$scope.currentStock; 
	$scope.editStockID;

	//----------------- STOCK LIST ----------------------
  	apiService.fetchStocks()
  	.then(function(data) {
  		$scope.stocks = data; 	
	    console.log('stocks', $scope.stocks);
  	}), function(error) {
  		console.log('fetch stocks error', error);
  	};

	//----------------- SHOW STOCK  ----------------------
    $scope.showCurrentStock = function(_id) {
	    apiService.fetchCurrentStock(_id)
	    .then(function(data) {
	    	$scope.currentStock = data;
    		$state.go('stock');
	    }), function(error) {
  		console.log('show stock error', error);
	    };
  	};

	//----------------- ADD STOCK  ----------------------
  	$scope.insertStock = function(stock) {
    	apiService.insertStock(stock)
    	.then(function(data) {
    		apiService.fetchStocks()
    		.then(function(data) {
  				$scope.stocks = data; 	
  			}), function(error) {
  				console.log('fetch stocks error', error);
  			};
    		$state.go('list');
    	}), function(error) {
  			console.log('insert stock error', error);
    	};
    };


	//----------------- DELETE STOCK  ----------------------
  	$scope.deleteStock = function(_id) {
    	apiService.deleteStock(_id)
    	.then(function(data) {
    		apiService.fetchStocks()
    		.then(function(data) {
  				$scope.stocks = data; 	
  			}), function(error) {
  				console.log('fetch stocks error', error);
  			};
    		$state.go('list');
    	}), function(error) {
  			console.log('delete stock error', error);
    	};
  	};
    //----------------- EDIT STOCK  ----------------------
	$scope.editStock = function(_id, stock) {
    	apiService.editStock(_id, stock)
    	.then(function(data) {
    		apiService.fetchStocks()
    		.then(function(data) {
  				$scope.stocks = data; 	
  			}), function(error) {
  				console.log('fetch stocks error', error);
  			};
    		$state.go('list');
    	}), function(error) {
  			console.log('edit stock error', error);
    	};
  	};

	//----------------- SUBMIT FORM ----------------------
	$scope.submitInsertForm = function(isValid) {
		if(isValid) {
			$scope.insertStock($scope.currentStock);
		}
	};

	//----------------- EDIT FORM ----------------------
	$scope.submitEditForm = function(isValid) {
		if(isValid) {
			$scope.editStock($scope.editStockID, $scope.currentStock);
		}
	};

	$scope.copyStock = function(stock) {
		$scope.currentStock = stock; 
	};

	$scope.copyEditStock = function(id, stock) {
		$scope.editStockID = id;
		$scope.currentStock = stock; 
	};

}]); 