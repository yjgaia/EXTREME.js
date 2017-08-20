TEST('OVERLOAD', (check) => {
	
	let overloadFunc = OVERLOAD([

	() => {
		return 'first';
	},

	(a) => {
		return a;
	},

	(a, b) => {
		return a + b;
	},

	(a, b, c) => {
		return a + b + c;
	}]);

	check(overloadFunc() === 'first');
	check(overloadFunc(1) === 1);
	check(overloadFunc(2, 3) === 5);
	check(overloadFunc(3, 4, 5) === 12);
});
