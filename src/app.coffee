app = angular.module 'sd-checker-app', [ 'ngRoute' ]

app.run ($rootScope, $http) ->
    $rootScope.cards = []

    $http.get('sd-cards.json').success (cards) ->
        $rootScope.cards = cards

module.exports = app