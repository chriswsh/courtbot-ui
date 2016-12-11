`use strict`;
angular.module(`courtApp`).config([`$routeProvider`, function($routeProvider) {
    $routeProvider
    .when ("/", {
        templateUrl: `pages/landing.html`,
        controller: `courtSubController`
    })
    .when ("/404", {
        templateUrl: `pages/404.html`,
        controller: `courtSubController`       
    })
    .otherwise({
        redirectTo: `/404`
    });
}]);