###
Copyright (C) 2014 Kano Computing Ltd.
License: http://www.gnu.org/licenses/gpl-2.0.txt GNU General Public License v2
###

app = angular.module 'sd-checker-app', [ 'ngRoute' ]

app.run ($rootScope, $http) ->
    $rootScope.cards = []

    $http.get('sd-cards.json').success (cards) ->
        $rootScope.cards = cards

module.exports = app