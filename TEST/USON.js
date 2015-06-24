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
	
	RUN(function() {
		
		var
		// Person
		Person = function(firstName, lastName) {
			this.firstName = firstName;
			this.lastName = lastName;
		},
		
		// origin data
		originData,
		
		// data
		data;
		
		Person.prototype.getName = function() {
			return this.firstName + ' ' + this.lastName;
		};

		originData = {
			Person : Person,
			person : new Person('Young Jae', 'Sim'),
			METHOD : METHOD
		};
		
		data = USON.parse(USON.stringify(originData));
		
		console.log(new data.Person('Young Jae', 'Sim').getName());
		console.log(data.person.getName());
	});
});
