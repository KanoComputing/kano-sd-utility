###
Copyright (C) 2014 Kano Computing Ltd.
License: http://www.gnu.org/licenses/gpl-2.0.txt GNU General Public License v2
###

app = require './app'

controllers =
    brandSelection: require './controller/brandSelection'
    typeSelection: require './controller/typeSelection'
    sizeSelection: require './controller/sizeSelection'
    results: require './controller/results'

app.config ($routeProvider, $httpProvider) ->

    # Routes
    $routeProvider
    .when '/', templateUrl: 'views/intro.html'
    .when '/selection', controller: controllers.brandSelection, templateUrl: 'views/brand-selection.html'
    .when '/selection/:brand', controller: controllers.typeSelection, templateUrl: 'views/type-selection.html'
    .when '/selection/:brand/:type', controller: controllers.sizeSelection, templateUrl: 'views/size-selection.html'
    .when '/selection/:brand/:type/:size', controller: controllers.results, templateUrl: 'views/results.html'
    .otherwise redirectTo: '/'