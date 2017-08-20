TEST('USON', (check) => {

	let data = {
	    msg : 'test',
	    date : new Date(),
	    func : () => {
	        console.log('ok!');
	    }
	};
	
	// where are date and func?
	console.log(JSON.parse(JSON.stringify(data)));
	
	// work correct.
	console.log(USON.parse(USON.stringify(data)));
	
	// ok!
	USON.parse(USON.stringify(data)).func();
	
	let Person = function(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	};
	
	Person.prototype.getName = function() {
		return this.firstName + ' ' + this.lastName;
	};

	let originData = {
		Person : Person,
		person : new Person('Young Jae', 'Sim')
	};
	
	let newData = USON.parse(USON.stringify(originData));
	
	console.log(new newData.Person('Young Jae', 'Sim').getName());
	console.log(newData.person.getName());
});
