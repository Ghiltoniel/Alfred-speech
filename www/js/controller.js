// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controller', [])

.controller('Home', function($scope, $rootScope, alfredService, $http){
	
	$scope.record = function(){
		if($rootScope.listening){
			ApiAIPlugin.stopListening();
			return;
		}
		
		$scope.action = '';
		$scope.parameters = '';
		$rootScope.listening = true;
		try {     
		  alfredService.Lights.allume('Salon');
		  ApiAIPlugin.requestVoice(
			{}, // empty for simple requests, some optional parameters can be here
			function (response) {
				// place your result processing here
				$scope.action = response.result.action;
				$scope.parameters = response.result.parameters;
				$scope.$apply();
				switch(response.result.action){
					case 'TurnOn':
						alfredService.Lights.allume(response.result.parameters.Room);
					break;
					case 'TurnOff':
						alfredService.Lights.eteins(response.result.parameters.Room);
					break;
					case 'TurnAllOn':
						alfredService.Lights.allumeTout();
					break;
					case 'TurnAllOff':
						alfredService.Lights.eteinsTout();
					break;
					case 'Scenario':
						alfredService.Scenario.run(response.result.parameters.Scenario);
					break;
				}
			},
			function (error) {
				// place your error processing here
				$rootScope.listening = false;
				$scope.$apply();
			});                
		} catch (e) {
			alert(e);
		}
	}
})