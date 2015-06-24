# EXTREME.js
EXTREME.js는 JavaScript의 한계를 뛰어넘기 위해 만들어진 [UPPERCASE.JS](https://github.com/Hanul/UPPERCASE.JS)기반 프로젝트입니다.

## 사용방법
1. UPPERCASE.JS-COMMON을 import 합니다.
2. 필요한 기능이 들어있는 파일을 import 합니다.

```html
<script>
    global = window;
</script>
<script src="UPPERCASE.JS-COMMON.js"></script>
<script src="MULTILINE.js"></script>
<script>
```

## MULTILINE
JavaScript에서 사용할 수 없는 멀티라인 문자열을 주석을 이용해서 지원하는 기능입니다.
```javascript
var
// multiline string
multilineStr = MULTILINE(function() {/*

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

## OVERLOAD
JavaScript에서 함수를 파라미터 개수에 따라 다르게 호출할 수 있는 기능입니다.
```javascript
var
// overload function
overloadFunc = OVERLOAD([

function() {
    console.log('first function.');
},

function(a) {
    console.log('second function, a:' + a);
},

function(a, b) {
    console.log('third function, a:' + a + ', b:' + b);
},

function(a, b, c) {
    console.log('fourth function, a:' + a + ', b:' + b + ', c:' + c);
}]);

overloadFunc();
overloadFunc(1);
overloadFunc(2, 3);
overloadFunc(3, 4, 5);
```

## ANNOTATION
JavaScript에서 어노테이션 주석을 인식할 수 있게 하는 기능입니다.

```javascript
var
// set color.
setColor = function(color) {
    console.log('setColor: ' + color);
},

// set color. (not empty)
setColorNotEmpty = function(color) {
    //@notEmpty

    console.log('setColor(not empty): ' + color);
},

// run.
run = function(func, color) {

    var
    // ann
    ann = ANNOTATION(func);

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

### ANNOTATION & OVERLOAD
어노테이션 주석을 이용하여 OVERLOAD 기능을 확장할 수 있습니다.
파라미터 type 검사는 JavaScript의 기본 type들과 array, Date 형을 지원합니다.

```javascript
var
// add.
add = OVERLOAD([

function(
//@number
a,

//@number
b) {

    console.log('add numbers.');

    return a + b;
},

function(
//@array
a,

//@array
b) {

    var
    // ret
    ret = [];

    console.log('add arrays.');

    EACH(a, function(v) {
        ret.push(v);
    });

    EACH(b, function(v) {
        ret.push(v);
    });

    return ret;
},

function(
//@date
a,

//@date
b) {

    console.log('add dates.');

    return new Date(a.getTime() + b.getTime());
},

function(a, b) {

    console.log('add unknowns.');

    return a + b;
}]);

console.log(add(1, 2));
console.log(add([1, 2], [3, 4]));
console.log(add('A', 'B'));
};
```

## USON
`JSON`을 확장한 것으로, 아래와 같이 다양한 종류의 타입을 처리할 수 있습니다.

* boolean
* number
* string
* array
* ***Date***
* ***function***

```javascript
var
// data
data = {
    msg : 'test',
    date : new Date(),
    func : function() {
        console.log('ok!');
    }
};

// where are date and func?
console.log(JSON.parse(JSON.stringify(data)));

// work correct.
console.log(USON.parse(USON.stringify(data)));

// ok!
USON.parse(USON.stringify(data)).func();
```

## License
[MIT](LISENCE)