angular.module('wlsApp.services', [])

/* SERVICE TO WRAP HTTP REQUEST */

.factory('apiService' , function($http) {
	var stockListUrl = 'http://mean.wlsllc.com:5000/api/stocks';

	var fetchStocks = function() {
		return $http ({
			method: 'GET',
			url: stockListUrl
		});
	}

	var fetchCurrentStock = function(_id) {
		return $http ({
			method: 'GET',
			url: stockListUrl + '/' + _id
		});
	}

	var insertStock = function(name) {
		return $http ({
			method: 'POST',
			url: stockListUrl + '/',
			data: "name=" + name,
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		});
	}

	var deleteStock = function(_id) {
		return $http ({
			method: 'DELETE',
			url: stockListUrl + '/' + _id
		});
	}

	//--- RETURN THE SERVICE OBJECT WITH METHODS -----
	return {
		fetchStocks: function() {
			return fetchStocks();
		},
		fetchCurrentStock: function(_id) {
			return fetchCurrentStock(_id);
		},
		insertStock: function(name) {
			return insertStock(name);
		},
		
		deleteStock: function(_id) {
			return deleteStock(_id);
		}
	};
});