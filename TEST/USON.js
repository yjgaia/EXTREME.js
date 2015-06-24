require('./UPPERCASE.JS-COMMON.js');
require('../USON.js');

TEST('USON', function(ok) {
	'use strict';

	INIT_OBJECTS();
	
	var
	// data
	data = {
	    msg : 'test',
	    date : new Date(),
	    func : function() {
	        console.log('ok!');
	    }
	};
	
	// where are date and func?
	console.log(JSON.parse(JSON.stringify(data)));
	
	// work correct.
	console.log(USON.parse(USON.stringify(data)));
	
	// ok!
	USON.parse(USON.stringify(data)).func();
});
