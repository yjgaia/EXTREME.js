EXTREME.JS
==========
EXTREME.JS는 JavaScript의 한계를 뛰어넘기 위해 만들어진 UPPERCASE.JS기반 프로젝트입니다.

- [UPPERCASE.JS](https://bitbucket.org/uppercaseio/uppercase.js)

### MULTILINE
JavaScript에서 사용할 수 없는 멀티라인 문자열을 지원하는 기능입니다.

###### Usage
    <script>
        global = window;
    </script>
    <script src="UPPERCASE.JS"></script>
    <script src="EXTREME.JS"></script>
    <script>
        // if not exists console.log.
        if (global.console === undefined || console.log === undefined || console.log.apply === undefined) {
            global.console = {
                log : function(msg) {
                    alert(msg);
                }
            };
        }

        global.onload = function() {

            // init all singleton classes.
            OBJECT.init();

            var
            // multiline string
            multilineStr = MULTILINE(function() {/*!@preserve

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

                 */0;
            });

            console.log(multilineStr);
        };
    </script>

### OVERLOAD
JavaScript에서 함수를 파라미터 개수에 따라 다르게 호출할 수 있는 기능입니다.

###### Usage
    <script>
        global = window;
    </script>
    <script src="UPPERCASE.JS"></script>
    <script src="EXTREME.JS"></script>
    <script>
        // if not exists console.log.
        if (global.console === undefined || console.log === undefined || console.log.apply === undefined) {
            global.console = {
                log : function(msg) {
                    alert(msg);
                }
            };
        }

        global.onload = function() {

            // init all singleton classes.
            OBJECT.init();

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
        };
    </script>

##### License
https://bitbucket.org/uppercaseio/uppercase.js/src/007c711583d32a9fcea26fd0ea5c3bf9b76dd2a6/LICENSE.md

2014 ⓒ BTNcafe · http://www.btncafe.com · contact@btncafe.com
