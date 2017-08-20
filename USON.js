/*
 * USON
 */
global.USON = OBJECT({

	init : (inner, self) => {

		let packData = (data) => {

			let result = COPY(data);
			
			let dateNames = [];
			let regexNames = [];
			let functionNames = [];

			EACH(result, (value, name) => {
				
				if (value instanceof Date === true) {
	
					// change to timestamp integer.
					result[name] = INTEGER(value.getTime());
					dateNames.push(name);
				}
				
				else if (value instanceof RegExp === true) {
	
					// change to string.
					result[name] = value.toString();
					regexNames.push(name);
				}
				
				else if (typeof value === 'function') {
					
					result[name] = value.toString();
					
					if (value.prototype !== undefined) {
						result[name + '__P'] = packData(value.prototype);
					}
					
					functionNames.push(name);
				}
				
				else if (CHECK_IS_DATA(value) === true) {
					result[name] = packData(value);
					result[name + '__P'] = packData(Object.getPrototypeOf(data[name]));
				}
				
				else if (CHECK_IS_ARRAY(value) === true) {
					
					EACH(value, (v, i) => {
						
						if (CHECK_IS_DATA(v) === true) {
							value[i] = packData(v);
						}
					});
				}
				
				else {
					// do nothing.
				}
			});

			result.__D = dateNames;
			result.__R = regexNames;
			result.__F = functionNames;

			return result;
		};

		let unpackData = (data) => {

			let result = COPY(data);

			// when date property names exists
			if (result.__D !== undefined) {
	
				// change timestamp integer to Date type.
				EACH(result.__D, (dateName, i) => {
					result[dateName] = new Date(result[dateName]);
				});
				
				delete result.__D;
			}
			
			// when regex property names exists
			if (result.__R !== undefined) {
	
				// change string to RegExp type.
				EACH(result.__R, (regexName, i) => {
					
					let pattern = result[regexName];
					let flags;
					
					for (let j = pattern.length - 1; j >= 0; j -= 1) {
						if (pattern[j] === '/') {
							flags = pattern.substring(j + 1);
							pattern = pattern.substring(1, j);
							break;
						}
					}
					
					result[regexName] = new RegExp(pattern, flags);
				});
				
				delete result.__R;
			}

			if (result.__F !== undefined) {
				
				EACH(result.__F, (functionName, i) => {
					
					if (result[functionName + '__P'] !== undefined) {
						result[functionName] = eval('false||' + result[functionName]);
						result[functionName].prototype = unpackData(result[functionName + '__P']);
						delete result[functionName + '__P'];
					}
					
					else {
						result[functionName] = eval(result[functionName]);
					}
				});
				
				delete result.__F;
			}

			EACH(result, (value, name) => {
				
				if (CHECK_IS_DATA(value) === true) {
					
					result[name] = unpackData(value);
					
					EXTEND({
						origin : result[name],
						extend : unpackData(result[name + '__P'])
					});
					
					delete result[name + '__P'];
				}
				
				else if (CHECK_IS_ARRAY(value) === true) {
					
					EACH(value, (v, i) => {

						if (CHECK_IS_DATA(v) === true) {
							value[i] = unpackData(v);
						}
					});
				}
			});

			return result;
		};

		let stringify = self.stringify = (data) => {
			//REQUIRED: data

			return JSON.stringify(packData(data));
		};

		let parse = self.parse = (str) => {
			//REQUIRED: str

			return unpackData(JSON.parse(str));
		};
	}
});