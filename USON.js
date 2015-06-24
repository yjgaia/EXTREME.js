/**
 * USON
 */
global.USON = USON = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// pack data.
		packData,

		// unpack data.
		unpackData,

		// stringify.
		stringify,

		// parse.
		parse;

		packData = function(data) {

			var
			// result
			result = COPY(data),

			// date attribute names
			dateAttrNames = [],

			// function attribute names
			functionAttrNames = [];

			EACH(result, function(value, name) {
				
				if ( value instanceof Date === true) {
					result[name] = INTEGER(value.getTime());
					dateAttrNames.push(name);
				}
				
				else if ( typeof value === 'function') {
					result[name] = value.toString();
					result[name + '__PROTOTYPE'] = packData(value.prototype);
					functionAttrNames.push(name);
				}
				
				else if (CHECK_IS_DATA(value) === true) {
					result[name] = packData(value);
					result[name + '__PROTOTYPE'] = packData(Object.getPrototypeOf(data[name]));
				}
				
				else if (CHECK_IS_ARRAY(value) === true) {
					EACH(value, function(v, i) {
						if (CHECK_IS_DATA(v) === true) {
							value[i] = packData(v);
						} else {
							// do nothing.
						}
					});
				}
				
				else {
					// do nothing.
				}
			});

			result.__DATE_ATTR_NAMES = dateAttrNames;
			result.__FUNCTION_ATTR_NAMS = functionAttrNames;

			return result;
		};

		unpackData = function(data) {

			var
			// result
			result = COPY(data);

			if (result.__DATE_ATTR_NAMES !== undefined) {
				EACH(result.__DATE_ATTR_NAMES, function(dateAttrName, i) {
					result[dateAttrName] = new Date(result[dateAttrName]);
				});
				delete result.__DATE_ATTR_NAMES;
			}

			if (result.__FUNCTION_ATTR_NAMS !== undefined) {
				EACH(result.__FUNCTION_ATTR_NAMS, function(functionAttrName, i) {
					result[functionAttrName] = eval('false||' + result[functionAttrName]);
					result[functionAttrName].prototype = unpackData(result[functionAttrName + '__PROTOTYPE']);
					delete result[functionAttrName + '__PROTOTYPE'];
				});
				delete result.__FUNCTION_ATTR_NAMS;
			}

			EACH(result, function(value, name) {
				
				if (CHECK_IS_DATA(value) === true) {
					result[name] = unpackData(value);
					EXTEND({
						origin : result[name],
						extend : unpackData(result[name + '__PROTOTYPE'])
					});
					delete result[name + '__PROTOTYPE'];
				}
				
				else if (CHECK_IS_ARRAY(value) === true) {
					EACH(value, function(v, i) {

						if (CHECK_IS_DATA(v) === true) {
							value[i] = unpackData(v);
						} else {
							// do nothing.
						}
					});
				}
				
				else {
					// do nothing.
				}
			});

			return result;
		};

		self.stringify = stringify = function(data) {
			//REQUIRED: data

			return JSON.stringify(packData(data));
		};

		self.parse = parse = function(str) {
			//REQUIRED: str

			return unpackData(JSON.parse(str));
		};
	}
});