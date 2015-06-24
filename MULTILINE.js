global.MULTILINE = MULTILINE = METHOD({

	run : function(func) {
		'use strict';
		//REQUIRED: func

		var
		// multiline string
		multilineStr = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//.exec(func.toString())[1],

		// indent match
		indentMatch = multilineStr.match(/^[ \t]*(?=[^\s])/gm),

		// indent count
		indentCount;

		if (indentMatch === TO_DELETE) {
			return str;
		} else {

			EACH(indentMatch, function(indent) {
				if (indentCount === undefined || indentCount > indent.length) {
					indentCount = indent.length;
				}
			});

			if (indentCount === 0) {
				return multilineStr;
			} else {
				return multilineStr.replace(new RegExp('^[ \\t]{' + indentCount + '}', 'gm'), '');
			}
		}
	}
});
