// Defines a simple system loop
`use strict`;

angular.module(`wshSystemLoop`, []);

angular.module(`wshSystemLoop`).service(`systemLoop`, [`$interval`, `$log`, function($interval, $log) {
    // The system loop function
    var _loopFunction = null;
    
    // How many between loop function executions
    var _loopInterval = 0;
    
    // The cancel function
    var _stopLoop = null;
    
    // Holds whether or not the loop is active
    var _loopActive = false;
    
    var _systemObject = null;
    
    this.setLoopFunction = function(loopFunction) {
        // Do not set up system loop if it's already running
        if (_loopActive) return false;        
        
        // Make sure we get a function
        if (Object.prototype.toString.call(loopFunction) === `[object Function]`) {
            _loopFunction = loopFunction;
            $log.log(`System Loop Initialized`);
            return true;
        }
        
        $log.error(`Unable to initialize system loop with ` + loopFunction);
        return false;
    }
    
    // Sets loop time, in MS
    this.setLoopInterval = function(loopInterval) {
        // Do not set up system loop if it's already running
        if (_loopActive) return false;
        
        // Make sure we get a number > 0
        // parseInt() for simplicity
        var _i = parseInt(loopInterval, 10);
        
        if (_i > 0) {
            _loopInterval = _i;
            $log.log(`System loop interval set to ` + _loopInterval + ` ms`);
            return true;
        }
        
        $log.error(`Unable to initialize system loop interval with ` + _i);
        return false;
    }
    
    // Set the object reference to place system loop info into
    this.setSystemObject = function(o) {
        // Do not set up system loop if it's already running
        if (_loopActive) return false;        
    
        // Make sure we get an object
        if (Object.prototype.toString.call(o) === `[object Object]`) {
            _systemObject = o;
            $log.log(`System object initialized`);
            return true;
        }

        $log.error(`Unable to initialize system loop with the following:`);
        $log.error(o);
    }
    
    // Starts the loop
    this.startLoop = function() {
        // Do not start up system loop if it's already running
        if (_loopActive) return false;
        
        _loopActive = true;
        $log.log(`Loop Start`);
        // run the function once before putting on interval
        _loopFunction(_systemObject);
        _stopLoop = $interval(_loopFunction, _loopInterval, 0, true, _systemObject);
    }
    
    // Stops the loop
    this.stopLoop = function() {
        // Function
        $interval.cancel(_stopLoop);
        _loopActive = false;
        $log.log(`Loop Stopped`);
    }
    
    // Syntactic Sugar for earlier functions
    this.Loop = function(loopFunction, loopInterval, systemObject, loopStart) {
        // Do not set up system loop if it's already running
        if (_loopActive) return false;
        
        if (this.setLoopFunction(loopFunction)) {
            if (this.setLoopInterval(loopInterval)) {
                if (this.setSystemObject(systemObject)) {
                    if (loopStart === true) {
                        this.startLoop();
                        return true;
                    }
                    return true;
                }
            }
        }
        return false;
    }
}]);