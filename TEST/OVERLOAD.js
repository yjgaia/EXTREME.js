require('./UPPERCASE.JS-COMMON.js');
require('../OVERLOAD.js');

TEST('OVERLOAD', function(ok) {
	'use strict';

	INIT_OBJECTS();
	
	var
	// overload function
	overloadFunc = OVERLOAD([

	function() {
		return 'first';
	},

	function(a) {
		return a;
	},

	function(a, b) {
		return a + b;
	},

	function(a, b, c) {
		return a + b + c;
	}]);

	ok(overloadFunc() === 'first');
	ok(overloadFunc(1) === 1);
	ok(overloadFunc(2, 3) === 5);
	ok(overloadFunc(3, 4, 5) === 12);
});
