# EXTREME.js
JavaScript의 한계를 넘을 수 있는 방법들을 시도하는 프로젝트입니다.

EXTREME.js는 [UPPERCASE-CORE](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE.md)를 기반으로 만들어졌습니다.

## 사용 방법
### Node.js 환경
```
npm install -s extreme.js
```
```javascript
require('extreme.js');
```

### 웹 브라우저 환경
```html
<script src="UPPERCASE-CORE/BROWSER.js"></script>
<script src="MULTILINE.js"></script>
<script src="OVERLOAD.js"></script>
<script src="ANNOTATION.js"></script>
<script src="USON.js"></script>
```

## `MULTILINE`
JavaScript에서 사용할 수 없는 멀티라인 문자열을 주석을 이용해서 지원하는 기능입니다.
```javascript
let multilineStr = MULTILINE(() => {/*

     동해물과 백두산이 마르고 닳도록
     하느님이 보우하사 우리나라 만세
     무궁화 삼천리 화려강산
     대한 사람 대한으로 길이 보전하세

     남산 위에 저 소나무 철갑을 두른 듯
     바람서리 불변함은 우리 기상일세
     무궁화 삼천리 화려강산
     대한 사람 대한으로 길이 보전하세

     가을 하늘 공활한데 높고 구름 없이
     밝은 달은 우리 가슴 일편단심일세
     무궁화 삼천리 화려강산
     대한 사람 대한으로 길이 보전하세

     이 기상과 이 맘으로 충성을 다하여
     괴로우나 즐거우나 나라 사랑하세
     무궁화 삼천리 화려강산
     대한 사람 대한으로 길이 보전하세

*/});

// \n동해물과 백두산이 마르고 닳도록\n하느님이 보우하사 우리나라 만세\n무궁화 삼천리 화려강산\n대한 사람 대한으로 길이 보전하세\n\n남산 위에 저 소나무 철갑을 두른 듯\n바람서리 불변함은 우리 기상일세\n무궁화 삼천리 화려강산\n대한 사람 대한으로 길이 보전하세\n\n가을 하늘 공활한데 높고 구름 없이\n밝은 달은 우리 가슴 일편단심일세\n무궁화 삼천리 화려강산\n대한 사람 대한으로 길이 보전하세\n\n이 기상과 이 맘으로 충성을 다하여\n괴로우나 즐거우나 나라 사랑하세\n무궁화 삼천리 화려강산\n대한 사람 대한으로 길이 보전하세
console.log(multilineStr);
```

### UglifyJS나 Yui Compressor 대응
아래와 같이 주석의 앞 뒤에 내용을 추가하면 JavaScript를 압축 할 때 주석을 제거하지 않습니다.
```javascript
MULTILINE(() => {/*!@preserve
	
	동해물과 백두산이 마르고 닳도록
	하느님이 보우하사 우리나라 만세
	무궁화 삼천리 화려강산
	대한 사람 대한으로 길이 보전하세

	남산 위에 저 소나무 철갑을 두른 듯
	바람서리 불변함은 우리 기상일세
	무궁화 삼천리 화려강산
	대한 사람 대한으로 길이 보전하세

	가을 하늘 공활한데 높고 구름 없이
	밝은 달은 우리 가슴 일편단심일세
	무궁화 삼천리 화려강산
	대한 사람 대한으로 길이 보전하세

	이 기상과 이 맘으로 충성을 다하여
	괴로우나 즐거우나 나라 사랑하세
	무궁화 삼천리 화려강산
	대한 사람 대한으로 길이 보전하세
	
*/''});
```

## `OVERLOAD`
JavaScript에서 함수를 파라미터 개수에 따라 다르게 호출할 수 있는 기능입니다.
```javascript
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

console.log(overloadFunc());
console.log(overloadFunc(1));
console.log(overloadFunc(2, 3));
console.log(overloadFunc(3, 4, 5));
```

## `ANNOTATION`
JavaScript에서 어노테이션 주석을 인식할 수 있게 하는 기능입니다.

```javascript
let setColor = (color) => {
    console.log('setColor: ' + color);
};

let setColorNotEmpty = (color) => {
    //@notEmpty
	
    console.log('setColor(not empty): ' + color);
};

let run = (func, color) => {

    let ann = ANNOTATION(func);
	
    if (color === undefined && ann.check('notEmpty')) {
        // ignore.
    } else {
        func(color);
    }
};

run(setColor, 'green');
run(setColorNotEmpty, 'green');
run(setColor, undefined);
run(setColorNotEmpty, undefined);
```

### `ANNOTATION` & `OVERLOAD`
어노테이션 주석을 이용하여 OVERLOAD 기능을 확장할 수 있습니다.
파라미터 type 검사는 JavaScript의 기본 type들과 array, Date 형을 지원합니다.

```javascript
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

console.log(add(1, 2));
console.log(add([1, 2], [3, 4]));
console.log(add('A', 'B'));
```

## `USON`
`JSON`을 확장한 것으로, 아래와 같이 다양한 종류의 타입을 처리할 수 있습니다.

* boolean
* number
* string
* array
* ***Date***
* ***function***
* ***prototype***

```javascript
let data = {
    msg : 'test',
    date : new Date(),
    func : () => {
        console.log('ok!');
    }
};

// where are date and func?
console.log(JSON.parse(JSON.stringify(data)));

// work correct.
console.log(USON.parse(USON.stringify(data)));

// ok!
USON.parse(USON.stringify(data)).func();

let Person = function(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
};

Person.prototype.getName = function() {
	return this.firstName + ' ' + this.lastName;
};

let originData = {
	Person : Person,
	person : new Person('Young Jae', 'Sim')
};

let newData = USON.parse(USON.stringify(originData));

console.log(new newData.Person('Young Jae', 'Sim').getName());
console.log(newData.person.getName());
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)
