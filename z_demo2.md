# ES6 笔记之第八章 函数的扩展

## 1. 函数参数的默认值
### 1.1 基本用法
```
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
```
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }
```
参数变量是默认声明的，所以不能用let 或const再次声明
```
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```
在使用参数默认值时，函数不能有同名参数。
```
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```
另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```
上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。

### 1.2 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值，结合起来作用。
```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

//如果没有提供参数，函数foo的参数默认为一个空对象
function foo1({x, y = 5} = {}) {
  console.log(x, y);
}

foo1() // undefined 5
```
代码比较：
```
//代码片段1
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {})  // "GET"

fetch('http://example.com')    // 报错

```
代码片段1 函数fetch的第二个参数是一个对象，就可以为他的三个属性设置默认值，这种写法不能忽略第二个参数
```
//代码片段2：
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"
```
代码片段2中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取的默认值GET。

```
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

```
上面两种写法都对函数的参数设定了默认值，区别是

写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；

写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

### 1.3 参数默认值的位置
定义默认值的参数，应该是函数的尾参数，这样比较容易看出来到底省略了哪些参数。如果非尾部的参数设置了默认值，实际上这个参数是没法省略的。
```
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```
上述代码中，有默认值的参数不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
```
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null
```
上面代码中，x参数对应undefined，结果触发了默认值，y参数等于null，就没有触发默认值

### 1.4 函数的 length 属性
指定了默认值以后，函数的length属性，将返回**没有指定默认值**的参数个数。也就是说，指定了默认值后，length属性将**失真**。
```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```
length属性的含义是，该函数预期传入的参数个数。当某个参数制定了默认值时，预期传入的参数个数就不包含这个参数了。
```
(function(...args) {}).length // 0

//如果设置了默认值的参数**不是尾参数**，那么length属性也**不再计入后面**的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

### 1.5 作用域

```
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```
上述代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在作用域内部，默认值变量x指向第一个参数x，而不是全局变量x，所以输出的是2.

```
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```
上述代码中，函数f调用时，参数y=x形成了一个单独的作用域。在作用域内部，变量x本身没有定义，所以指向外层的全局变量x。函数在调用时，函数体内部的变量x对默认值变量x不产生任何影响。

如果此时，全局变量x不存在，就会报错。

```
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
//ReferenceError（引用错误） 对象代表当一个不存在的变量被引用时发生的错误。
```
上述代码中，参数x=x形成了一个单独的作用域。实际执行的是let x=x，由于暂时性死区的原因，回报引用错误。

```
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer
```
上述代码中，函数bar的参数func的默认值是一个匿名函数，返回变量foo。函数参数形成的单独作用域里边，并没有定义变量foo，所以foo指向的是外层的全局变量foo，因此输出outer。

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```
上述代码中，函数foo形成一个单独的作用域。在该作用域内，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数，在匿名函数内部的变量x，指向同一作用域的第一个参数x。函数foo内部有声明了一个内部变量x，该变量与第一个参数x不在同一个作用域，所以不是同一个变量，因此在执行y后，内部变量x与全局变量x都没有变化

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```
上述代码中，去掉了var ，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，最后输出的就是2，而最外层的全局变量x不受影响。

### 1.6 应用
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```
上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值**不是在定义时执行，而是在运行时执行**。如果参数已经赋值，默认值中的函数就不会运行。

另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

function foo(optional = undefined) { ··· }

## 2. rest 参数
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组。
```
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
上述代码中，add是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。

* rest参数代替argument变量的例子
```
// arguments变量的写法
function sortNumbers() {
  return Array.from(arguments).sort();
}

// rest参数的写法 (更简洁)
const sortNumbers = (...numbers) => numbers.sort();
```
argument对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.from先将其转为数组。

rest参数就不存在此类问题，他就是一个真正的数组，数组特有的方法它都可以使用。

下边是一个利用rest参数改写数组push方法的例子：
```
function push (array,...items){
  console.log(array);
  items.forEach(function(item){
    array.push(item);
    console.log(item);
  })
}

var a=[];
push(a,1,2,3)

```
**注意**，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

函数的length属性，不包括 rest 参数。
```
(function(a){}).length  //1
(function(...a){}).length  //0
(function(a,...b){}).length  //1
```

## 3. 严格模式
在ES6中，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能**显式**指定严格模式。

有两种方法可以避免此类问题：
1. 设定全局性的严格模式，这是合法的。
```
'use strict';

function doSomething(a,b=a){
  //code
}
```
2. 把函数包在一个无参数的立即执行函数里边
```
const doSomething=(function(){
  'use strict';
  return function(value = 42){
    return value ;
  }
}());
```

## 4. name 属性
函数的name属性，返回该函数的函数名。

如果讲一个匿名函数赋值给一个变量，ES5的name属性会返回空字符串，ES6的name属性会返回实际的函数名。
```
var f = function(){};

//ES5
f.name //''

//ES6
f.name  //'f'

//如果将一个具名函数赋值给一个变量，则ES5和ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```
```
//Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name

//build 返回的函数，name属性值会加上bound前缀
function foo(){};
foo.build({}).name  //"bound foo"

(function(){}.build({}).name)  //"bound"
```

## 5. 箭头函数










基本用法
使用注意点
不适用场合
嵌套的箭头函数
尾调用优化
什么是尾调用？
尾调用优化
尾递归
递归函数的改写
严格模式
尾递归优化的实现
函数参数的尾逗号
Function.prototype.toString()
catch 命令的参数省略