'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', function($q, $resource, $http, FORECASTIO_KEY) {

  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  var weatherResources = $resource(url, { 
      callback: 'JSON_CALLBACK' 
    }, { 
      get: { 
        method: 'JSONP'
      }
    });

  /*function getCurrentWeather(lat, lgn) {
    return $http.jsonp(url + lat + ',' + lgn + '?callback=JSON_CALLBACK&units=si');
  }*/

  return {
    getCurrentWeather: function(lat, lgn) {
      return $http.jsonp(url + lat + ',' + lgn + '?callback=JSON_CALLBACK&units=si');
    }
  };

}];

angular.module('starter.services', ['ngResource'])
  .factory('Cities', function() {
    
    var cities = [
      { id: 0, name: 'Miami', lat:25.7877, lgn: 80.2241 },
      { id: 1, name: 'New York City', lat: 40.7127, lgn: 74.0059 },
      { id: 2, name: 'London', lat:51.5072, lgn: 1.1275 },
      { id: 3, name: 'Los Angeles', lat: 34.0500, lgn: 118.2500 },
      { id: 4, name: 'Dallas', lat: 32.7758, lgn:96.7967  },
      { id: 5, name: 'Frankfurt', lat:50.1117, lgn: 8.6858 },
      { id: 6, name: 'New Delhi', lat:28.6100, lgn: 77.2300 },
      { id: 7, name: 'Dubai', lat:25.2695, lgn: 55.3088 },
      { id: 8, name: 'Brussels', lat:50.8484, lgn: 4.3497 },
      { id: 9, name: 'Kuala Lumpur', lat:3.1048, lgn: 101.6920 },
      { id: 10, name: 'Tokyo', lat:35.6832, lgn: 139.8089 },
      { id: 11, name: 'Male', lat:4.1752, lgn: 73.5093 }
    ];

    return {
      all: function() {
        return cities;
      },
      get: function(cityId) {
        // Simple index lookup
        return cities[cityId];
      }
    };
    
  })
  .factory('Datastore', function(){

    var Datastore = {
      city: 'London',
      latitude: 51.5072,
      longitude: 1.1275
    };

    Datastore.setCity = function(value) {
      Datastore.city = value;
      console.log('City value: ', value);
    };

    Datastore.setLatitude = function(value) {
      Datastore.latitude = value;
      console.log('Lat value: ', value);
    };

    Datastore.setLongitude = function(value) {
      Datastore.longitude = value;
      console.log('Long value: ', value);
    };

    return Datastore;

  })
  .factory('Weather', forecastioWeather);
