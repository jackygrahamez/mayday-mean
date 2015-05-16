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

		$scope.myInterval = 5000;
		  var slides = $scope.slides = [
				/*{ image:'/modules/core/img/carousel/c1.jpg', text: 'Moto 360' },
				{ image:'/modules/core/img/carousel/c2.jpg' },
				{ image:'/modules/core/img/carousel/c3.jpg' },*/
				{ image:'/modules/core/img/carousel/c6.jpg' },
				{ image:'/modules/core/img/carousel/c5.jpg' },
				{ image:'/modules/core/img/carousel/c4.jpg' },
				{ image:'/modules/core/img/carousel/c3.jpg' },
				{ image:'/modules/core/img/carousel/c2.jpg' },
				{ image:'/modules/core/img/carousel/c1.jpg' }

			];
	}
]);
