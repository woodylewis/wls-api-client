angular.module('wlsApp.services', [])

/* SERVICE TO WRAP HTTP REQUEST */

.factory('apiService' , function($http) {
	//var stockListUrl = 'http://dev1:5000/api/stocks';
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

	//---- TRANSFORMREQUESTASFORMPOST AVOIDS HAVING TO INCLUDE JQUERY FOR SERIALIZATION --
	//---- SEE FIRST ANSWER (as of Jan 27, 2015) IN THIS STACKOVERFLOW ARTICLE -----------
	//---- http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object/1714899#1714899 
	var transformRequestAsFormPost = function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
	}
	//-----
	
	var insertStock = function(stock) {
		console.log('INSERT', stock);
		var payload = { 
						name:stock.name, 
						ticker:stock.ticker
					};

		return $http ({
			method: 'POST',
			url: stockListUrl + '/',
			transformRequest: transformRequestAsFormPost,
			data: payload,
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		});
	}

	var deleteStock = function(_id) {
		return $http ({
			method: 'DELETE',
			url: stockListUrl + '/' + _id
		});
	}

	var editStock = function(_id, stock) {
		console.log('EDIT', stock);
		var payload = { 
						name:stock.name, 
						ticker:stock.ticker
					};

		return $http ({
			method: 'PUT',
			url: stockListUrl + '/' + _id,
			transformRequest: transformRequestAsFormPost,
			data: payload,
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
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
		insertStock: function(stock) {
			return insertStock(stock);
		},
		deleteStock: function(_id) {
			return deleteStock(_id);
		},
		editStock: function(_id, stock) {
			return editStock(_id, stock);
		}
	};
});