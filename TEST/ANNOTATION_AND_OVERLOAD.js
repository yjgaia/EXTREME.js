TEST('ANNOTAION & OVERLOAD', (check) => {
	
	let add = OVERLOAD([
	
	(
	//@number
	a,
	
	//@number
	b) => {
		return a + b;
	},
	
	(
	//@array
	a,
	
	//@array
	b) => {
	
		let ret = [];
		
		EACH(a, (v) => {
			ret.push(v);
		});
	
		EACH(b, (v) => {
			ret.push(v);
		});
	
		return ret;
	},
	
	(
	//@date
	a,
	
	//@date
	b) => {
		return new Date(a.getTime() + b.getTime());
	},
	
	(a, b) => {
		return a + b;
	}]);
	
	check(add(1, 2) === 3);
	
	check(CHECK_ARE_SAME([
		add([1, 2], [3, 4]),
		[1, 2, 3, 4]
	]));
	
	check(add('A', 'B') === 'AB');
});
