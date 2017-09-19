var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

//what happens when user get to a url
app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'index.html',
			controller: 'mainController'
		})
		//the login display
		.when('/service', {
			templateUrl: 'service.html',
			// need to change the controller
			controller: 'authController'
		})
		.when('/tour', {
			templateUrl: 'tour.html',
		// need to change the controller
			controller: 'authController'
		})
		.when('/testimonial', {
			templateUrl: 'testimonial.html',
		// need to change the controller
			controller: 'authController'
		})
		.when('/preparevisit', {
			templateUrl: 'visit.html',
		// need to change the controller
			controller: 'authController'
		})
		.when('/techtips', {
			templateUrl: 'techtips.html',
		// need to change the controller
			controller: 'authController'
		})
		.when('/faq', {
			templateUrl: 'faq.html',
		// need to change the controller
			controller: 'authController'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

// app.controller('mainController', function(postService, $scope, $rootScope){
// 	$scope.posts = postService.query();
// 	$scope.newPost = {created_by: '', text: '', created_at: ''};

// 	$scope.post = function() {
// 	  $scope.newPost.created_by = $rootScope.current_user;
// 	  $scope.newPost.created_at = Date.now();
// 	  postService.save($scope.newPost, function(){
// 	    $scope.posts = postService.query();
// 	    $scope.newPost = {created_by: '', text: '', created_at: ''};
// 	  });
// 	};
// });

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user1 = {email: '', username: '', password: '',number:''};
  $scope.user2 = {username: '', password: ''};

  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user2).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        //redirct to another page
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };


  $scope.register = function(){
    $http.post('/register', $scope.user1).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        // $scope.error_message = data.message;
        $scope.error_message = 'registeration request for ' + $scope.user.username;
      }
    });
  };
});
