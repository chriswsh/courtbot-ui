// use strict stops function hoisting?
`use strict`;

angular.module(`courtApp`).controller(`courtController`, [`$scope`, `$location`, `$window`, `$interval`, `$log`, `systemLoop`, function($scope, $location, $window, $interval, $log, systemLoop) {
    
    // Hard coded for now, but eventually linked to login and such via services
    $scope.name = `Compliant Test Subject`;
    $scope.status = `Live`;
    
    $log.log('Angular Loaded!');
    
    // For information about the Texting system
    $scope.system = {
        "time": Date.now(),
        "status": `Loading...`
    };
    
    // The system loop function to be run - Abstract into config later
    // systemVars it the object that should be modified with any results
    // IMPORTANT: Do not reassign the systemVars object, because that will move the pointer
    // and break the functionality of pass by reference!
    // Only reassign properties of systemVars
    var _systemLoop = function(systemVars) {
        var o = {};
        
        var _checkStatus = function() {
            // AJAX here...
            
            return `Online!`;
        }
        
        var _checkAlerts = function() {
            // AJAX here...
            
            return [{ title: `Alert 1`,
                      text: `This is an alert!` },
                    
                    { title: `Alert 2`,
                      text: `This is also an alert!` },

                    { title: `Alert 3`,
                      text: `Yet another one! Lots of stuff happening today.` },
                    
                    { title: `So...`,
                      text: `...come here often?`}
                   ];
        }
        
        $log.log(`Loop tick`);
        systemVars.time = Date.now();
        systemVars.status = _checkStatus();
        systemVars.alerts = _checkAlerts();
        
        /* VERY BAD MOJO
        
        results.time = Date.now();
        results.status = _checkStatus();
        systemVars = results; */
    }
    
    // Run system loop every second
    systemLoop.Loop(_systemLoop, 1000, $scope.system, true);
    
    $scope.notYet = function() {
        alert(`I don't do anything yet. My apologies.`);
    }
        
    // Catch the path change event emitted from the subcontroller
    $scope.$on(`pathChange`, function (event, newPath) {
        
    });
    
}])
.controller(`courtSubController`, [`$scope`, `$location`, function($scope, $location) {
// Child Contoller - All it currently does is notify the parent controller of the path change
// Will add more, based on $location.path(), as page gets more complex
    $scope.$emit(`pathChange`, $location.path());
}]);;