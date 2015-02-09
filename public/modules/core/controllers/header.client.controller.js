'use strict';

angular.module('core').controller('HeaderController',
['$scope', 'Authentication', 'Menus', '$location',
	function($scope, Authentication, Menus, $location) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.navigation =  [
    { page: 'Home', path: '' },
    { page: 'About', path: 'about' },
    { page: 'Technology', path: 'technology' },
    { page: 'Privacy', path: 'privacy' },
    { page: 'Contact', path: 'contact' }];

		$scope.userNavigation =  [
		{ page: 'Sign Up', path: 'signup' },
		{ page: 'Sign In', path: 'signin' }];

		$scope.navClass = function (page) {
				page = page.toLowerCase();
				var currentRoute = $location.path().substring(1) || 'home';
				currentRoute = currentRoute.toLowerCase();
				return page === currentRoute ? 'active' : '';
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
