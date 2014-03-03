app = require './app'

controllers =
    brandSelection: require './controller/brandSelection'
    typeSelection: require './controller/typeSelection'
    sizeSelection: require './controller/sizeSelection'
    results: require './controller/results'

app.config ($routeProvider, $httpProvider) ->

    # Routes
    $routeProvider
    .when '/', controller: controllers.brandSelection, templateUrl: 'views/brand-selection.html'
    .when '/selection/:brand', controller: controllers.typeSelection, templateUrl: 'views/type-selection.html'
    .when '/selection/:brand/:type', controller: controllers.sizeSelection, templateUrl: 'views/size-selection.html'
    .when '/selection/:brand/:type/:size', controller: controllers.results, templateUrl: 'views/results.html'
    .otherwise redirectTo: '/'