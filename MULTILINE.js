/*
 * JavaScript에서 사용할 수 없는 멀티라인 문자열을 주석을 이용해서 지원하는 기능
 */
global.MULTILINE = METHOD({

	run : (func) => {
		//REQUIRED: func

		let multilineStr = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//.exec(func.toString())[1];
		let indentMatch = multilineStr.match(/^[ \t]*(?=[^\s])/gm);

		if (indentMatch === TO_DELETE) {
			return str;
		} else {
			
			let indentCount;

			EACH(indentMatch, (indent) => {
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
