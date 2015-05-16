'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'duParallax', 'duScroll', 'vcRecaptcha', 'slick'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
//console.dir(ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]).run(["$rootScope", "$location", "parallaxHelper", function($rootScope, $location, parallaxHelper) {
	$rootScope.background = parallaxHelper.createAnimator(-0.3);
	$rootScope.transitionBackground = function(elementPosition) {

		if (screen.width > 767) {
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
		}
		//console.log('positions '+positions);
		return {
			backgroundPosition: positions
		};
	};
}]);
//$scope.background = parallaxHelper.createAnimator(-0.3);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Blog Posts', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'Blog Posts', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Post', 'articles/create');
	}
]);

'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('messaging', {
			url: '/messaging',
			templateUrl: 'modules/core/views/messaging.client.view.html'
		}).
		state('contact', {
			url: '/contact',
			templateUrl: 'modules/core/views/contact.client.view.html'
		}).
		state('technology', {
			url: '/technology',
			templateUrl: 'modules/core/views/technology.client.view.html'
		}).
		state('about', {
			url: '/about',
			templateUrl: 'modules/core/views/about.client.view.html'
		}).
		state('privacy', {
			url: '/privacy',
			templateUrl: 'modules/core/views/privacy.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
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

'use strict';

angular.module('core').controller('ContactController', ['$scope', 'vcRecaptchaService',
	function($scope, vcRecaptchaService) {
		// Controller Logic
		// ...
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
	}
]);

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

'use strict';

angular.module('core').controller('MessagingController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

angular.module('core').controller('PrivacyController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

angular.module('core').controller('TechnologyController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/users/views/dashboard.client.view.html'
		}).
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
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

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);