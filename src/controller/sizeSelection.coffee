module.exports = ($scope, $rootScope, $routeParams) ->
    $scope.brand = $routeParams.brand
    $scope.type = $routeParams.type

    $scope.filtered = []

    $rootScope.$watch 'cards', ->
        for card in $rootScope.cards
            if card.brand is $scope.brand and card.type is $scope.type
                $scope.filtered.push card

        sizes = []

        for card in $scope.filtered
            if sizes.indexOf(card.size) is -1 then sizes.push card.size

        $scope.sizes = sizes