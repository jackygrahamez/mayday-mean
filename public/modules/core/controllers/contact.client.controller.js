'use strict';

angular.module('core').controller('ContactController', ['$scope', 'vcRecaptchaService', '$http',
	function($scope, vcRecaptchaService, $http) {
		// Controller Logic
		// ...
		console.log("this is your app's controller");
		$scope.response = null;
		$scope.widgetId = null;
		$scope.model = {
			key: '6LfsoAYTAAAAALXOlBeMDzOjDDO0dLeURcsSEzQq'
		};
		$scope.setResponse = function (response) {
				$scope.response = response;
		};
		$scope.setWidgetId = function (widgetId) {
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
				//console.log('sending the captcha response to the server', $scope.response);
				if (true) { //valid
						console.log('Success');
						console.dir($scope.contactform.inputName.$modelValue);
						$scope.formPost = {};
						$scope.formPost.inputName = $scope.contactform.inputName.$modelValue;
						$scope.formPost.inputEmail = $scope.contactform.inputEmail.$modelValue;
						$scope.formPost.inputSubject = $scope.contactform.inputSubject.$modelValue;
						$scope.formPost.inputMessage = $scope.contactform.inputMessage.$modelValue;
						$http.post('/contact_support', $scope.formPost).success(function(response) {
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
	}
]);
