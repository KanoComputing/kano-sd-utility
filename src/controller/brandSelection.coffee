###
Copyright (C) 2014 Kano Computing Ltd.
License: http://www.gnu.org/licenses/gpl-2.0.txt GNU General Public License v2
###

module.exports = ($scope, $rootScope) ->
    $scope.filtered = []

    $rootScope.$watch 'cards', ->
        brands = []

        for card in $rootScope.cards
            if brands.indexOf(card.brand) is -1 then brands.push card.brand

        $scope.filtered = $scope.brands = brands

    $scope.$watch 'brandSearch', (val) ->
        if not val?
            $scope.filtered = $scope.brands
            return false

        filtered = []

        val = val.toLowerCase()

        for brand in $scope.brands
            if brand.toLowerCase().indexOf(val) isnt -1 or val.indexOf(brand.toLowerCase()) isnt -1
                filtered.push brand

        $scope.filtered = filtered