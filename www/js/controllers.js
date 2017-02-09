angular.module('homechef.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $rootScope, $auth, $ionicPopup) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    $scope.signupData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginmodal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.signupmodal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.loginmodal.hide();
    };

    $scope.closeSignup = function() {
      $scope.signupmodal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.loginmodal.show();
    };

    $scope.signup = function() {
      $scope.signupmodal.show();
    };

    $scope.doSignup = function() {
      $ionicLoading.show({
        template: 'Signing up...'
      });
      $auth.submitRegistration($scope.signupData)
        .then(function(resp) {
          $ionicLoading.hide();
          $scope.closeSignup();
          $ionicLoading.show({
            template: 'Successfully signed up!',
            duration: 1000
          });
        })
        .catch(function(error) {
          $ionicLoading.hide();
          console.log(error);
          $scope.errorMessage = error;
          $scope.showAlert('Failure', 'Invalid email or password');
        });
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      $ionicLoading.show({
        template: 'Logging in...'
      });
      $auth.submitLogin($scope.loginData)
        .then(function(resp) {
          $ionicLoading.hide();
          $scope.closeLogin();
          $ionicLoading.show({
            template: 'Successfully logged in!',
            duration: 1000
          });
        })
        .catch(function(error) {
          $ionicLoading.hide();
          $scope.errorMessage = error;
          $scope.showAlert('Failure', 'Invalid email or password');
        });
      };



      $scope.showAlert = function(message, content) {
        var alertPopup = $ionicPopup.alert({
          title: message,
          template: content
        });
        alertPopup.then(function(res) {

        });
      };

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
  
    $rootScope.$on('auth:login-success', function(ev, user) {
      $scope.currentUser = angular.extend(user, $auth.retrieveData('auth_headers'));
    });

    $rootScope.$on('auth:registering-success', function(ev, user) {
      $scope.currentUser = angular.extend(user, $auth.retrieveData('auth_headers'));
    });
  })


  .controller('dishesCtrl', function($state, $scope, dishes, $ionicLoading, $ionicPopup) {
    $scope.$on('$ionicView.enter', function() {
      $ionicLoading.show({
        template: 'Retrieving delicious food'
      });
      dishes.query(function(response) {
        $scope.dishCollection = response.entries;
        $ionicLoading.hide();
      }, function(response) {
        //error
      });
    });
  })

  .controller('displayDishCtrl', function($scope, $stateParams) {});
