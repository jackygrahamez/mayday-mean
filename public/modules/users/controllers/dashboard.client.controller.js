'use strict';

angular.module('core').controller('DashboardController',
['$scope', 'Authentication', 'Menus', '$location',
	function($scope, Authentication, Menus, $location) {
		$scope.authentication = Authentication;
		$scope.contacts = [{},{},{}];
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
			{name: "Suncom", domain: "number@tms.suncom.com"},
			{name: "Qwest", domain: "qwestmp.com"},
			{name: "U.S. Cellular", domain: "number@email.uscc.net"}
		];
	}
]);
