global.ANNOTATION = ANNOTATION = CLASS({

	init : function(inner, self, func) {
		'use strict';
		//REQUIRED: func

		var
		// func string
		funcStr = func.toString(),

		// annotations
		annotations,

		// parameter annotation map
		parameterAnnotationMap = {},

		// parameter string
		parameterStr = /^[\s\(]*function[^(]*\(\s*([^)]*?)\s*\)/.exec(func.toString())[1],

		// parameter infos
		parameterInfos = parameterStr === '' ? undefined : parameterStr.split(/,\s*/),

		// get annotation comments.
		getAnnotationComments,

		// get annotations.
		getAnnotations,

		// check.
		check,

		// get parameter annotations.
		getParameterAnnotations,

		// check parameter.
		checkParameter;

		funcStr = funcStr.replace(/^[\s\(]*function[^(]*\(\s*([^)]*?)\s*\)/, '');

		getAnnotationComments = function(str) {

			var
			// comments
			comments = str.replace(/'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"/gm, '').match(/(\/\/@(.*)$)/gm);

			if (comments === TO_DELETE) {
				comments = [];
			}

			EACH(comments, function(comment, i) {
				comments[i] = comment.substring(3);
			});

			return comments;
		};

		annotations = getAnnotationComments(funcStr);

		self.getAnnotations = getAnnotations = function() {
			return annotations;
		};

		self.check = check = function(annotation) {
			return FIND({
				data : annotations,
				value : annotation
			}) !== undefined;
		};

		if (parameterInfos !== undefined) {
			EACH(parameterInfos, function(parameterInfo, i) {
				parameterAnnotationMap[i] = getAnnotationComments(parameterInfo);
			});
		}

		self.getParameterAnnotations = getParameterAnnotations = function(i) {
			return parameterAnnotationMap[i];
		};

		self.checkParameter = checkParameter = function(i, annotation) {

			var
			// parameter annotations
			parameterAnnotations = getParameterAnnotations(parameterName);

			return parameterAnnotations !== undefined && FIND({
				data : parameterAnnotations,
				value : annotation
			}) !== undefined;
		};
	}
});
