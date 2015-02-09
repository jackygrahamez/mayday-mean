'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
//console.dir(ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]).run(function($rootScope, $location, parallaxHelper) {
	$rootScope.background = parallaxHelper.createAnimator(-0.3);
	$rootScope.transitionBackground = function(elementPosition) {
		var left = elementPosition.elemY * -0.6,
		right = left * -1,
		positions = left + 'px '+left+'px, ' +
		parseInt(right + 2) + 'px '+parseInt(right + 2)+'px, ' +
		parseInt(left + 3) + 'px '+parseInt(right + 3)+'px, ' +
		parseInt(right + 4) + 'px '+parseInt(right + 4)+'px, ' +
		'0px '+left+'px, '+
		'0px '+parseInt(right + 3)+'px, '+
		'0px '+parseInt(right + 2)+'px, '+
		'0px '+parseInt(right + 4)+'px';
		//console.log('positions '+positions);
		return {
			backgroundPosition: positions
		};
	};
});
//$scope.background = parallaxHelper.createAnimator(-0.3);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
