angular.module('starter.controllers', [])

.controller('ParkingCtrl', function($scope, $http) {

   	$scope.init = function(){

   		$scope.results = [];

	   	var slider = $('#distance').CircularSlider({ 
			min : 0, 
			max : 100, 
			value: 1, 
	    	touch: true,
	    	animate: true,
	    	innerCircleRatio : .7,
	    	formLabel : function(value, prefix, suffix) {
	        	return value > 50 ? parseFloat(value / 50) + '<br />miles' : (value * 10) + '<br />meters';
	    	},
	    	animateDuration : 360,
	    	slide: function(ui, value) {
	    		console.log('the value', value);
	    	},
	   	});

	   	var duration = $('#duration').CircularSlider({ 
			min : 0, 
			max : 300, 
			value: 30, 
	    	touch: true,
	    	animate: true,
	    	shape: 'Half Circle',
	    	innerCircleRatio : .7,
	    	labelSuffix: ' mins',
	    	animateDuration : 360,
	    	slide: function(ui, value) {
	    		console.log('the value', value);
	    	},
	   	});

   	}

   	$scope.findParking = function(){

   		var zipcode = 	94105;
   		var lat 	=	37.792275;
   		var lon 	=	-122.397089;
   		var radius 	=	0.25;
   		var parkingURL = 'http://api.sfpark.org/sfpark/rest/availabilityservice?lat=' + lat + '&long=' +  lon + '&radius=' + radius + '&uom=mile&response=json';

   		$http
   			.get('js/parkingData.json')
   			.success(function(data, status, headers, config){
		    	angular.forEach(data.AVL, function(value, key){
		    		$scope.results.push({ 
		    				'name' : value.NAME, 
		    				'desc' : value.DESC, 
		    				'intersection' : value.INTER, 
		    				'operating_hours' : value.OPS ? value.OPS : [],
		    				'type' : value.TYPE,
		    			});
		    	});
		  	})
		  	.error(function(data, status, headers, config) {
		    	
		  	});
   	}

   	$scope.init();

})

.controller('GasCtrl', function($scope, $http) {

	$scope.gasStations =	[];

	$scope.findGasPrices 	=	function(){

		var lat 	=	'37.4848304';
		var lon 	=	'-122.20338470000002';

   		var gasAPIUrl =	'http://api.mygasfeed.com/stations/radius/' + lat + '/' + lon + '/2/reg/price/jn8ybt18zm.json?callback=JSON_CALLBACK';

   		$http
   			.jsonp(gasAPIUrl)
   			.success(function(data, status, headers, config){

   				angular.forEach(data.stations, function(datax, key){
					$scope.gasStations.push({
	   					'address': datax.address,
	   					'city' : datax.city,
	   					'id' : datax.id,
	   					'distance' : datax.distance,
	   					'reg_price' : data.reg_price,
	   					'pre_price' : data.pre_price
	   				});
   				});

		  	})
		  	.error(function(data, status, headers, config) {
		    	
		  	});
   	}

   	$scope.findGasPrices();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
