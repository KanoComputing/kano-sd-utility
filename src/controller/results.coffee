module.exports = ($scope, $rootScope, $routeParams) ->
    $scope.brand = $routeParams.brand
    $scope.type = $routeParams.type
    $scope.size = $routeParams.size

    $scope.results = []

    $rootScope.$watch 'cards', ->
        results = []

        for card in $rootScope.cards
            if card.brand is $scope.brand and card.type is $scope.type and card.size is $scope.size
                results.push card

        $scope.results = results