require('./UPPERCASE.JS-COMMON.js');
require('../ANNOTATION.js');
require('../OVERLOAD.js');

TEST('ANNOTAION & OVERLOAD', function(ok) {
	'use strict';

	INIT_OBJECTS();
		
		var
	// add.
	add = OVERLOAD([
	
	function(
	//@number
	a,
	
	//@number
	b) {
	    return a + b;
	},
	
	function(
	//@array
	a,
	
	//@array
	b) {
	
	    var
	    // ret
	    ret = [];
	    
	    EACH(a, function(v) {
	        ret.push(v);
	    });
	
	    EACH(b, function(v) {
	        ret.push(v);
	    });
	
	    return ret;
	},
	
	function(
	//@date
	a,
	
	//@date
	b) {
	    return new Date(a.getTime() + b.getTime());
	},
	
	function(a, b) {
	    return a + b;
	}]);
	
	ok(add(1, 2) === 3);
	
	ok(CHECK_ARE_SAME([
		add([1, 2], [3, 4]),
		[1, 2, 3, 4]
	]));
	
	ok(add('A', 'B') === 'AB');
});
