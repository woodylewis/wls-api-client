'use strict';

angular.module('wlsApp', [
  	'wlsApp.services',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'd3'
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
.directive('wlsBarchart2', [ 'd3Service', function (d3Service) {
	return {
		restrict: 'E',
		templateUrl: 'templates/wls-barchart2.html',
		//--- WE WANT THE TEMPLATE TO BIND PARENT CONTEXT --- 
		transclude: true,

		link: function($scope) {
			d3Service.d3().then(function(d3) {
				//-- WE ALSO WANT ACCESS TO PARENT VARIABLES HERE ---
				var theStock = $scope.$parent.currentStock;
				var dataset = [
						theStock.year1, 
						theStock.year2, 
						theStock.year3, 
						theStock.year4, 
						theStock.year5 
					];	
				
console.log('dataset', dataset);
				var w = 300;
				var h = 100;
				var barPadding = 4;

				var svg = d3.select(".wls-stock-bar")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

				var y = d3.scale.linear()
				   	   .domain([0, d3.max(dataset)])
				   	   .range([0, h]);
				   
				svg.selectAll("rect")
				   .data(dataset)
				   .enter()
				   .append("rect")


				   .attr("x", function(d, i) {
				   		return i * (w / dataset.length);
				   })
				   .attr("y", function(d) {
				   		return y - (d * 4);
				   		//return h - (d * 4);
				   })


				   .attr("width", (w / dataset.length - barPadding)/2)
				   .attr("height", y)
				   /*
				   .attr("height", function(d) {
				   		return d * 4;
				   })
			*/



				   .attr("fill", function(d) {
						return "rgb(0, 0, 0";
				   });
/*
				svg.selectAll("text")
				   .data(dataset)
				   .enter()
				   .append("text")
				   .text(function(d) {
				   		return d;
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
				   		return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
				   })
				   .attr("y", function(d) {
				   		return h - (d * 4) + 14;
				   })
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "11px")
				   .attr("fill", "white");
*/
			});
		}
	};
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