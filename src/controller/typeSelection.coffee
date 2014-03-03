module.exports = ($scope, $rootScope, $routeParams) ->
    $scope.brand = $routeParams.brand

    $scope.filtered = []

    $rootScope.$watch 'cards', ->
        for card in $rootScope.cards
            if card.brand is $scope.brand then $scope.filtered.push card

        types = []

        for card in $scope.filtered
            if types.indexOf(card.type) is -1 then types.push card.type

        $scope.types = types