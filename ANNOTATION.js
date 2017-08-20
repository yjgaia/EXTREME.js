/*
 * JavaScript에서 어노테이션 주석을 인식할 수 있게 하는 기능
 */
global.ANNOTATION = ANNOTATION = CLASS({

	init : (inner, self, func) => {
		//REQUIRED: func

		let funcStr = func.toString();
		
		let parameterAnnotationMap = {};
		let parameterStr = /^[^(]*\(\s*([^)]*?)\s*\)/.exec(funcStr)[1];
		let parameterInfos = parameterStr === '' ? undefined : parameterStr.split(/,\s*/);
	
		funcStr = funcStr.replace(/^[^(]*\(\s*([^)]*?)\s*\)/, '');

		let getAnnotationComments = (str) => {
			
			let comments = str.replace(/'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm, '').match(/(\/\/@(.*)$)/gm);

			if (comments === TO_DELETE) {
				comments = [];
			}

			EACH(comments, (comment, i) => {
				comments[i] = comment.substring(3);
			});

			return comments;
		};

		let annotations = getAnnotationComments(funcStr);

		let getAnnotations = self.getAnnotations = () => {
			return annotations;
		};

		let check = self.check = (annotation) => {
			return FIND({
				data : annotations,
				value : annotation
			}) !== undefined;
		};

		if (parameterInfos !== undefined) {
			EACH(parameterInfos, (parameterInfo, i) => {
				parameterAnnotationMap[i] = getAnnotationComments(parameterInfo);
			});
		}

		let getParameterAnnotations = self.getParameterAnnotations = (i) => {
			return parameterAnnotationMap[i];
		};

		let checkParameter = self.checkParameter = (i, annotation) => {

			let parameterAnnotations = getParameterAnnotations(parameterName);

			return parameterAnnotations !== undefined && FIND({
				data : parameterAnnotations,
				value : annotation
			}) !== undefined;
		};
	}
});
