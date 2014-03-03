(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app;

app = angular.module('sd-checker-app', ['ngRoute']);

app.run(function($rootScope, $http) {
  $rootScope.cards = [];
  return $http.get('sd-cards.json').success(function(cards) {
    return $rootScope.cards = cards;
  });
});

module.exports = app;


},{}],2:[function(require,module,exports){
module.exports = function($scope, $rootScope) {
  $scope.filtered = [];
  $rootScope.$watch('cards', function() {
    var brands, card, _i, _len, _ref;
    brands = [];
    _ref = $rootScope.cards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      if (brands.indexOf(card.brand) === -1) {
        brands.push(card.brand);
      }
    }
    return $scope.filtered = $scope.brands = brands;
  });
  return $scope.$watch('brandSearch', function(val) {
    var brand, filtered, _i, _len, _ref;
    if (val == null) {
      $scope.filtered = $scope.brands;
      return false;
    }
    filtered = [];
    val = val.toLowerCase();
    _ref = $scope.brands;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      brand = _ref[_i];
      if (brand.toLowerCase().indexOf(val) !== -1 || val.indexOf(brand.toLowerCase()) !== -1) {
        filtered.push(brand);
      }
    }
    return $scope.filtered = filtered;
  });
};


},{}],3:[function(require,module,exports){
module.exports = function($scope, $rootScope, $routeParams) {
  $scope.brand = $routeParams.brand;
  $scope.type = $routeParams.type;
  $scope.size = $routeParams.size;
  $scope.results = [];
  return $rootScope.$watch('cards', function() {
    var card, results, _i, _len, _ref;
    results = [];
    _ref = $rootScope.cards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      if (card.brand === $scope.brand && card.type === $scope.type && card.size === $scope.size) {
        results.push(card);
      }
    }
    return $scope.results = results;
  });
};


},{}],4:[function(require,module,exports){
module.exports = function($scope, $rootScope, $routeParams) {
  $scope.brand = $routeParams.brand;
  $scope.type = $routeParams.type;
  $scope.filtered = [];
  return $rootScope.$watch('cards', function() {
    var card, sizes, _i, _j, _len, _len1, _ref, _ref1;
    _ref = $rootScope.cards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      if (card.brand === $scope.brand && card.type === $scope.type) {
        $scope.filtered.push(card);
      }
    }
    sizes = [];
    _ref1 = $scope.filtered;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      card = _ref1[_j];
      if (sizes.indexOf(card.size) === -1) {
        sizes.push(card.size);
      }
    }
    return $scope.sizes = sizes;
  });
};


},{}],5:[function(require,module,exports){
module.exports = function($scope, $rootScope, $routeParams) {
  $scope.brand = $routeParams.brand;
  $scope.filtered = [];
  return $rootScope.$watch('cards', function() {
    var card, types, _i, _j, _len, _len1, _ref, _ref1;
    _ref = $rootScope.cards;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card = _ref[_i];
      if (card.brand === $scope.brand) {
        $scope.filtered.push(card);
      }
    }
    types = [];
    _ref1 = $scope.filtered;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      card = _ref1[_j];
      if (types.indexOf(card.type) === -1) {
        types.push(card.type);
      }
    }
    return $scope.types = types;
  });
};


},{}],6:[function(require,module,exports){
require('./app');

require('./routes');


},{"./app":1,"./routes":7}],7:[function(require,module,exports){
var app, controllers;

app = require('./app');

controllers = {
  brandSelection: require('./controller/brandSelection'),
  typeSelection: require('./controller/typeSelection'),
  sizeSelection: require('./controller/sizeSelection'),
  results: require('./controller/results')
};

app.config(function($routeProvider, $httpProvider) {
  return $routeProvider.when('/', {
    controller: controllers.brandSelection,
    templateUrl: 'views/brand-selection.html'
  }).when('/selection/:brand', {
    controller: controllers.typeSelection,
    templateUrl: 'views/type-selection.html'
  }).when('/selection/:brand/:type', {
    controller: controllers.sizeSelection,
    templateUrl: 'views/size-selection.html'
  }).when('/selection/:brand/:type/:size', {
    controller: controllers.results,
    templateUrl: 'views/results.html'
  }).otherwise({
    redirectTo: '/'
  });
});


},{"./app":1,"./controller/brandSelection":2,"./controller/results":3,"./controller/sizeSelection":4,"./controller/typeSelection":5}]},{},[6])