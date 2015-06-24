require('./UPPERCASE.JS-COMMON.js');
require('../ANNOTATION.js');

TEST('ANNOTATION', function(ok) {
	'use strict';

	INIT_OBJECTS();
	
	var
	// set color.
	setColor = function(color) {
	    console.log('setColor: ' + color);
	},
	
	// set color. (not empty)
	setColorNotEmpty = function(color) {
	    //@notEmpty
	
	    console.log('setColor(not empty): ' + color);
	},
	
	// run.
	run = function(func, color) {
	
	    var
	    // ann
	    ann = ANNOTATION(func);
	
	    if (color === undefined && ann.check('notEmpty')) {
	        // ignore.
	    } else {
	        func(color);
	    }
	};
	
	run(setColor, 'green');
	run(setColorNotEmpty, 'green');
	run(setColor, undefined);
	run(setColorNotEmpty, undefined);
});
