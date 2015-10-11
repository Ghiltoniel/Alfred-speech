// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controller', 'alfred'])

.run(function($ionicPlatform, $rootScope, $http, alfredService) {
	
	ionic.Platform.ready(function(){
		$rootScope.loadingAlfred = true;
		alfredService.init({
			name: 'Alfred-angular-client',
			host: 'nam.kicks-ass.org',
			port: 13100,
			onConnect: function(){
				alfredService.User.login('guigui', 'Ghiltoniel1').then(function(data){
					if(data.Command == 'Authenticated'){
						alfredService.Scenario.getAll().then(function(data){
							var entries = [];
							for(var i in data){
								entries.push({
									'value': data[i].Name
								});
							}
							
							/*$http.put('https://api.api.ai/v1/entities/76336141-b17f-4717-b4d6-85a596ead777',{
								'id': '76336141-b17f-4717-b4d6-85a596ead777',
								'name': 'Scenario',
								"entries": entries
							}, {
								'headers': {
									'Authorization': 'Bearer 7e03d1d7812c4668a73668cb48ca85a1',
									'ocp-apim-subscription-key': 'f3749954-9f71-485c-a5d6-7985afe0a4e6',
									'Content-Type': 'application/json; charset=utf-8'
								}
							})*/
						})
					}
				});				
				$rootScope.loadingAlfred = false;
			}
		  });
				
		$rootScope.loadingApiAI = true;
		ApiAIPlugin.init(
			{
				subscriptionKey: "f3749954-9f71-485c-a5d6-7985afe0a4e6", // insert your subscription key here
				clientAccessToken: "7e03d1d7812c4668a73668cb48ca85a1", // insert your client access key here
				lang: "fr" // set lang tag from list of supported languages
			}, 
			function(result) { 
				$rootScope.loadingApiAI = false; 
			},
			function(error) { alert(JSON.stringify(error)); }
		);
		
		ApiAIPlugin.levelMeterCallback(function(level) {
		   $rootScope.level = level;
		   // add visualization code here
		});
	
		window.ApiAIPlugin.setListeningFinishCallback(
		    function(){
				$rootScope.listening = false; 
		    }
		);

    });
	
	
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
		  StatusBar.styleDefault();
		}

	});
})
