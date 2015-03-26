'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'parallaxHelper',
	function($scope, Authentication, parallaxHelper) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.grow = function(a) {
				return a.elemY < 300 && a.elemY > 50 ? {
						msTransform: 'scale(1.2)',
						webkitTransform: 'scale(1.2)',
						MozTransform: 'scale(1.2)',
						OTransform: 'scale(1.2)',
						transform: 'scale(1.2)'
				} : {
						msTransform: 'scale(1)',
						webkitTransform: 'scale(1)',
						MozTransform: 'scale(1)',
						OTransform: 'scale(1)',
						transform: 'scale(1)'
				};
		};
	}
]);
