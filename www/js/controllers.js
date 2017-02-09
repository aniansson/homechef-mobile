angular.module('homechef.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $rootScope) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $rootScope.$on('auth:login-success', function(ev, user) {
      $scope.currentUser = angular.extend(user,
      $auth.retrieveData('auth_headers'));
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      $ionicLoading.show({
        template: 'Logging in...'
      });

      $auth.submitLogin($scope.loginData)
        .then(function(resp) {
          // handle success response
          $ionicLoading.hide();
          $scope.closeLogin();
          $ionicLoading.show({
              template: 'Successfully logged in!',
              duration: 1000
            });
        })

        .catch(function(error) {
          $ionicLoading.hide();
          // handle error response
          $scope.errorMessage = error;
          $scope.showAlert('Failure', 'Invalid email or password');
        });

        $scope.showAlert = function (message, content) {
         var alertPopup = $ionicPopup.alert({
           title: message,
           template: content
         });
         alertPopup.then(function (res) {

         });
       };

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
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
