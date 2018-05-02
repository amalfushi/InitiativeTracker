angular.module("demo").controller("SimpleDemoController", function ($scope) {
    $scope.models = {
        selected: null,
        lists: { "A": [], "B": [] }
    };

    //generate initial model
    for(let i = 1; i <= 3; i++) {
        $scope.models.lists.a.push({label: "Item A" + i});
        $scope.models.lists.a.push({label: "Item B" + i});
    }

    $scope.$watch("models", function(model) {
        $scope.modelAsJson= angular.toJson(model, true);
    }, true);
})