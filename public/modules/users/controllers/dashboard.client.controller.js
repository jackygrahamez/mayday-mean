'use strict';

angular.module('core').controller('DashboardController',
['$scope', '$http', 'Users', 'Authentication', 'Menus', '$location', 'vcRecaptchaService',
	function($scope, $http, Authentication, Users, Menus, $location, vcRecaptchaService ) {
		//reCAPTCHA.setPublicKey('6LfsoAYTAAAAALXOlBeMDzOjDDO0dLeURcsSEzQq');
		console.log("this is your app's controller");
		$scope.response = null;
		$scope.widgetId = null;
		$scope.model = {
				key: '6LfsoAYTAAAAALXOlBeMDzOjDDO0dLeURcsSEzQq'
		};
		$scope.setResponse = function (response) {
				console.info('Response available');
				$scope.response = response;
		};
		$scope.setWidgetId = function (widgetId) {
				console.info('Created widget ID: %s', widgetId);
				$scope.widgetId = widgetId;
		};
		$scope.submit = function () {
				var valid;
				/**
				* SERVER SIDE VALIDATION
				*
				* You need to implement your server side validation here.
				* Send the reCaptcha response to the server and use some of the server side APIs to validate it
				* See https://developers.google.com/recaptcha/docs/verify
				*/
				console.log('sending the captcha response to the server', $scope.response);
				if (valid) {
						console.log('Success');
				} else {
						console.log('Failed validation');
						// In case of a failed validation you need to reload the captcha
						// because each response can be checked just once
						vcRecaptchaService.reload($scope.widgetId);
				}
		};

		$scope.user = Authentication.user;
		$scope.authentication = Authentication;
		$scope.contacts = (user.contacts.length > 0) ? user.contacts : [];
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
		$scope.deleteContact = function($index) {
			//delete user.contacts[$index];
			user.contacts.splice($index, 1);
			$scope.success = $scope.error = null;
			//$scope.contacts[$index].provider = $scope.serviceProvider[$scope.contacts[$index].provider];
			//$scope.contacts.splice($index, 1);
			$http.post('/users/deletecontact', user).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				//$scope.passwordDetails = null;
			}).error(function(response) {
				console.log('error: '+response.message);
				$scope.error = response.message;
			});
		};
		$scope.saveContact = function($index) {
			var valid;
			/**
			* SERVER SIDE VALIDATION
			*
			* You need to implement your server side validation here.
			* Send the reCaptcha response to the server and use some of the server side APIs to validate it
			* See https://developers.google.com/recaptcha/docs/verify
			*/
			console.log('sending the captcha response to the server', $scope.response);
			if (valid) {
					console.log('Success');
					$scope.contacts[$index].edit = false;
					$scope.contacts[$index].update = true;
					$scope.contacts[$index].warning = 'Pending Validation';
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
			} else {
					console.log('Failed validation');
					// In case of a failed validation you need to reload the captcha
					// because each response can be checked just once
					vcRecaptchaService.reload($scope.widgetId);
			}
		};
		$scope.updateMessage = function($index) {
			var message = "Dear "+$scope.contacts[$index].firstName+",\n\nI would like to add you as an emergency contact. Please confirm your contact information.\n\nBest,\n\n"+user.firstName;
			$scope.contacts[$index].message = message;
			$scope.contacts[$index].warning = "Pending Validation";
		};
	}
]);
