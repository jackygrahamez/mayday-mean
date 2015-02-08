'use strict';

angular.module('core').controller('AboutController', ['$scope', 'parallaxHelper',
	function($scope, parallaxHelper) {
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
