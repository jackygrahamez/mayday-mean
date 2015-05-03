'use strict';

angular.module('core').controller('DashboardController',
['$scope', '$http', 'Authentication', 'Menus', '$location',
	function($scope, $http, Authentication, Menus, $location) {
		$scope.authentication = Authentication;
		$scope.contacts = [];
		$scope.serviceProvider = [
			{name: "I Don't Know", domain: ""},
			{name: "AT&T", domain: "txt.att.net"},
			{name: "T-Mobile", domain: "tmomail.net"},
			{name: "Verizon", domain: "vtext.com"},
			{name: "Sprint", domain: "messaging.sprintpcs.com"},
			{name: "Virgin Mobile", domain: "vmobl.com"},
			{name: "Tracfone", domain: "mmst5.tracfone.com"},
			{name: "Metro PCS", domain: "mymetropcs.com"},
			{name: "Boost Mobile", domain: "myboostmobile.com"},
			{name: "Cricket", domain: "sms.mycricket.com"},
			{name: "Nextel", domain: "messaging.nextel.com"},
			{name: "Alltel", domain: "message.alltel.com"},
			{name: "Ptel", domain: "ptel.com"},
			{name: "Suncom", domain: "tms.suncom.com"},
			{name: "Qwest", domain: "qwestmp.com"},
			{name: "U.S. Cellular", domain: "email.uscc.net"}
		];
		$scope.serviceProvider.sort(function (a, b) {
		  if (a.name > b.name) {
		    return 1;
		  }
		  if (a.name < b.name) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
		});
		$scope.addContact = function($index) {
			$scope.addButton = false;
			$scope.contacts.push({edit:true});
		};
		$scope.saveContact = function($index) {
			console.log('saveContact');
			$scope.addButton = true;
			$scope.contacts[$index].edit = false;
			$scope.success = $scope.error = null;
			$scope.contacts[$index].provider = $scope.serviceProvider[$scope.contacts[$index].provider];
			$http.post('/users/addcontact', $scope.contacts[$index]).success(function(response) {
				// If successful show success message and clear form
				console.log('success');
				$scope.success = true;
				//$scope.passwordDetails = null;
			}).error(function(response) {
				console.log('error: '+response.message);
				$scope.error = response.message;
			});
		};
		$scope.sendContactRequest = function($index) {

		};
		$scope.updateMessage = function($index) {
			var message = "Dear "+$scope.contacts[$index].firstName+",\n\nI would like to add you as an emergency contact. Please confirm your contact information.\n\nBest,\n\n"+$scope.authentication.user.firstName;
			$scope.contacts[$index].message = message;
			$scope.contacts[$index].warning = "Pending Validation";

		};
	}
]);
