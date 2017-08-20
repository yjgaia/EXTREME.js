/*
 * JavaScript에서 함수를 파라미터 개수에 따라 다르게 호출할 수 있는 기능
 */
global.OVERLOAD = METHOD(() => {
	
	let getArgumentCount = (func) => {
		
		let found = /^[^(]*\(\s*([^)]*?)\s*\)/.exec(func.toString());
		
		return found[1] === '' ? 0 : found[1].split(/,\s*/).length;
	};
	
	return {

		run : (funcs) => {
			//REQUIRED: funcs
	
			let funcInfoMap = {};
	
			EACH(funcs, (func) => {
	
				let argumentCount = getArgumentCount(func);
	
				if (funcInfoMap[argumentCount] === undefined) {
					funcInfoMap[argumentCount] = [];
				}
	
				funcInfoMap[argumentCount].push({
					func : func,
					annotation : global.ANNOTATION === undefined ? undefined : ANNOTATION(func)
				});
			});
	
			return function() {
	
				let args = arguments;
				let funcInfos = funcInfoMap[arguments.length];
				let func;
	
				if (funcInfos !== undefined) {
	
					EACH(funcInfos, (funcInfo) => {
	
						let b = true;
						
						if (funcInfo.annotation !== undefined) {
	
							EACH(args, (value, i) => {
		
								EACH(funcInfo.annotation.getParameterAnnotations(i), (annotation) => {
									
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
