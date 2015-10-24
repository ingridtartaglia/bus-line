var busLineApp = angular.module('busLineApp', ['ionic', 'uiGmapgoogle-maps']);

busLineApp.controller('busLineCtrl', ['$scope', 'lines', '$ionicLoading', function($scope, lines, $ionicLoading){
    $scope.map = { center: { latitude: -22.9694793, longitude: -43.2911334 }, zoom: 10 };

    $scope.getBusLine = function(){
        if ($scope.busLine.length > 2) {
            $ionicLoading.show();
            lines.getLines($scope.busLine)
            .then(function(line){
                $scope.buses = line.data.DATA;
                $ionicLoading.hide();
            });
        }
    }
}]);

busLineApp.factory('lines', ['$http', function($http){
    var url = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterPosicoesDaLinha/";

    return {
        getLines: function(line) {
            return $http.get(url + line);
        }
    }


}]);

busLineApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: "/",
        templateUrl: "templates/main.html"
    })
    $urlRouterProvider.otherwise('/');
});
