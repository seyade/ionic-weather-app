angular.module('starter.controllers', ['ionic'])
  .constant('FORECASTIO_KEY', '6f3b6f31d5f1792aa1f1c6e5e8b31abd')

  .controller('HomeCtrl', function($scope, $state, $ionicLoading, Weather, Datastore) {
    console.log('inside home');

    var latitude = Datastore.latitude,
        longitude = Datastore.longitude;

    $scope.city = Datastore.city;

    $ionicLoading.show({
      content: 'Updating...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    Weather.getCurrentWeather(latitude, longitude).then(function(resp) {

      $scope.current = resp.data;
      //$scope.current.currently.temperature = parseInt($scope.current.currently.temperature);

      $scope.applyMood = function() {

        switch($scope.current.currently.icon) {
          case 'clear-day':
            return 'sunny-mood';
            break;

          case 'partly-cloudy-day':
            return 'sunny-cloud-mood';
            break;

          case 'clear-night':
            return 'nice-night-mood';
            break;

          case 'partly-cloudy-night':
            return 'night-cloudy-mood';
            break;

          case 'rain':
            return 'grey-mood';
            break;

          case 'cloudy':
            return 'so-so-mood';
            break;

          case 'snow':
            return 'frieza-mood';
            break;

          case 'fog':
            return 'so-so-mood';
            break;

          default:
            return 'ion-ios-shuffle';
        };
      };

      $scope.iconType = function() {

        switch($scope.current.currently.icon) {
          case 'clear-day':
            return 'ion-ios-sunny-outline';
            break;

          case 'partly-cloudy-day':
            return 'ion-ios-partlysunny-outline';
            break;

          case 'clear-night':
            return 'ion-ios-moon-outline';
            break;

          case 'partly-cloudy-night':
            return 'ion-ios-cloudy-night-outline';
            break;

          case 'rain':
            return 'ion-ios-rainy-outline';
            break;

          case 'cloudy':
            return 'ion-ios-cloudy-outline';
            break;

          case 'snow':
            return 'ion-ios-snowy';
            break;

          case 'fog':
            return 'ion-ios-glasses-outline';
            break;

          default:
            return 'ion-ios-shuffle';
          };
      };

      $ionicLoading.hide();

      console.log('Got current weather', $scope.current);
      //debugger;
    }, function(err) {
      alert('Unable to get current weather conditions');
      console.error(err);
    });
  })

  .controller('LocationsCtrl', function($scope, $state, Cities, Datastore) {

    $scope.cities = Cities.all();

    $scope.changeCity = function(cityId) {

      var lat = $scope.cities[cityId].lat,
          lgn = $scope.cities[cityId].lgn,
          city = $scope.cities[cityId].name;

      Datastore.setCity(city);
      Datastore.setLatitude(lat);
      Datastore.setLongitude(lgn);

      $state.go('tab.home');
    };

  })

  .controller('SettingsCtrl', function($scope) {
    $scope.settings = { changeToDim: false };

    console.log($scope.settings.changeToDim);
  });
