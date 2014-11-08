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
		var platform = (typeof device !== 'undefined' && device.platform == 'Android') ? 'android' : 'ios';

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
	   					'lat' : datax.lat,
	   					'lng' : datax.lng,
	   					'reg_price' : (datax.reg_price == 'N/A') ? null : data.reg_price,
	   					'pre_price' : (datax.pre_price == 'N/A') ? null : data.pre_price,
	   					'station' : (datax.station == 'Unbranded') ? null : data.station,
	   					'hrefURL' : platform == 'ios' ? "maps://maps.apple.com/?q="+ datax.lat +',' + datax.lng : "geo:" + datax.lat + ',' + datax.lng
	   				});
   				});

   				$scope.loading = false;

		  	})
		  	.error(function(data, status, headers, config) {
		    	
		  	});
   	}

   	$scope.showMap = function(url){
   		window.location.href = url;
   	}

   	$scope.init 	=	function(){
   		$scope.loading = true;
   		$scope.findGasPrices();
   	}

   	$scope.init();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $http) {

	$scope.getUserData 	=	function(){

		var userDataURL =	'https://api-jp-t-itc.com/GetVehicleInfo';
		$http
   			.get('js/data/userData.json')
   			.success(function(data, status, headers, config){
		    	$scope.user = data.vehicleinfo ? data.vehicleinfo[0] : {};
		  	})
		  	.error(function(data, status, headers, config) {
		    	
		  	});
	}

	$scope.init = function(){
		$scope.user = {};
		$scope.getUserData();
	}

	$scope.init();
});
