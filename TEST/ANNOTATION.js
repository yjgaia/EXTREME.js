TEST('ANNOTATION', (check) => {
	
	let setColor = (color) => {
	    console.log('setColor: ' + color);
	};
	
	let setColorNotEmpty = (color) => {
	    //@notEmpty
		
	    console.log('setColor(not empty): ' + color);
	};
	
	let run = (func, color) => {
	
	    let ann = ANNOTATION(func);
		
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
