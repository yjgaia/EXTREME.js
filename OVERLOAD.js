global.OVERLOAD = OVERLOAD = METHOD(function() {
	'use strict';

	var
	// get argument count.
	getArgumentCount = function(func) {

		var
		// found
		found = /^[\s\(]*function[^(]*\(\s*([^)]*?)\s*\)/.exec(func.toString());

		return found[1] === '' ? 0 : found[1].split(/,\s*/).length;
	};
	
	return {

		run : function(funcs) {
			//REQUIRED: funcs
	
			var
			// func info map
			funcInfoMap = {};
	
			EACH(funcs, function(func) {
	
				var
				// argument count
				argumentCount = getArgumentCount(func);
	
				if (funcInfoMap[argumentCount] === undefined) {
					funcInfoMap[argumentCount] = [];
				}
	
				funcInfoMap[argumentCount].push({
					func : func,
					annotation : global.ANNOTATION === undefined ? undefined : ANNOTATION(func)
				});
			});
	
			return function() {
	
				var
				// args
				args = arguments,
	
				// func infos
				funcInfos = funcInfoMap[arguments.length],
	
				// func
				func;
	
				if (funcInfos !== undefined) {
	
					EACH(funcInfos, function(funcInfo) {
	
						var
						// b
						b = true;
						
						if (funcInfo.annotation !== undefined) {
	
							EACH(args, function(value, i) {
		
								EACH(funcInfo.annotation.getParameterAnnotations(i), function(annotation) {
		
									if (annotation === 'array' && CHECK_IS_ARRAY(value) === true) {
										return;
									} else if (annotation === 'date' && VALID.date(value) === true) {
										return;
									} else if (annotation === typeof value) {
										return;
									}
		
									b = false;
									return false;
								});
	
								if (b === false) {
									return false;
								}
							});
						}
	
						if (b === true) {
							func = funcInfo.func;
							return false;
						}
					});
				}
	
				if (func !== undefined) {
					return func.apply(undefined, arguments);
				}
			};
		}
	};
});
