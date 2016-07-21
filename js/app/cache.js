define(function(){
    
    /**
     * cache object
     *
     * @type {Object}
     */
    var _cache = {};
    
    /**
     * set
     *
     * @param {string} key
     * @param {mixed} value
     */
    var set = function (key, value) {
        _cache[key] = value;
    };
    
    /**
     * get
     *
     * @param  {string} key
     *
     * @return {mixed}
     */
    var get = function (key) {
        if (has(key)) {
            return _cache[key];
        }
        
        return null;
    };
    
    /**
     * has
     *
     * @param  {tring} key
     *
     * @return {boolean}
     */
    var has = function (key) {
        return typeof _cache[key] != 'undefined';
    };
    
    /**
     * clear
     *
     * @return {void}
     */
    var clear = function () {
        _cache = {};
    };
    
    return {
        'set' : set,
        'get' : get,
        'has' : has,
        'clear' : clear,
    };
});
