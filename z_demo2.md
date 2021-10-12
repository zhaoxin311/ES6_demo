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
### 5.1 基本用法
ES6 允许使用‘箭头’函数(=>)定义函数。
```
var f = v =>v;

//等同于

var f = function(v){
  return v;
}

```
如果箭头函数不需要参数或者需要多个参数，就使用一个圆括号代表参数部分。
```
var f = () =>5;
//等同于
var f = function(){ return 5 };

var sum = (num1,num2)=>num1+num2;
var sum = (num1, num2) => { return num1 + num2; }
//等同于
var f = function(num1,num2){ return num1+num2 };

```
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外边加上括号，否则报错。
```
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });

//下面是一种特殊情况，虽然可以运行，但会得到错误的结果。
let foo = () => { a: 1 };
foo() // undefined
//上述代码，原始意图是返回一个对象{a：1}，由于默认大括号为代码块，所以执行一行语句a:1。这时，a被解释为语句的标签，因此实际执行的语句是1，然后函数就结束了，没有返回值。

```
如果箭头函数只有一行语句，并且必须要返回值，可以采用以下写法：不需要使用大括号。
let fn = () => void doesNotReturn();

箭头函数可以与变量解构结合使用
```
//箭头函数
const full = ({first,last}) => {return first +''+last}
//等同于
function full(person){
  return person.first+''+person.last;
}
```
箭头函数使得表达更加简洁。
```
const isEven = n => n % 2 === 0;
const square = n => n * n;
//等同于

function isEvent(n){
  return n % 2 === 0;
}

function square(n){
  reutrn n * n;
}
```
箭头函数的一个用途是简化回调函数：
```
//普通函数写法
[1,2,3].map(function(x){
  return x *x  //[1,4,9]
})
//箭头函数写法
[1,2,3].map(x => x * x);

//普通函数写法
var result = values.sort(function(a,b){
  return a-b;
})
//箭头函数写法
var result = values.sort((a,b)=>a-b);

//sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
```
下边是rest参数与箭头函数结合的例子，
```
const numbers = (...nums) => nums;
numbers(1,2,3,4,5,6) //[1,2,3,4,5,6]

const headAndTail = (head,...tail) => [head,tail]
headAndTail(1,2,3,4,5,6)  //[1,[2,3,4,5]]
```
### 5.2 使用注意点
箭头函数有几个使用注意点：
1. 箭头函数没有自己的this对象。
2. 不可以当做构造函数，也就是说，不可以对箭头函数使用new命令，否则会报错
3. 不可以使用argument对象，该对象在函数体内不存在，如果要用，可以使用rest参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数
  - yield 关键字用来暂停和恢复一个生成器函数

  ```
  //以下代码是一个生成器函数的声明。
    function* countAppleSales () {
    var saleList = [3, 7, 5];
    for (var i = 0; i < saleList.length; i++) {
      yield saleList[i];
    }
  }

  //一旦生成器函数已定义，可以通过构造一个迭代器来使用它。
  var appleStore = countAppleSales(); // Generator { }
  console.log(appleStore.next()); // { value: 3, done: false }
  console.log(appleStore.next()); // { value: 7, done: false }
  console.log(appleStore.next()); // { value: 5, done: false }
  console.log(appleStore.next()); // { value: undefined, done: true }
  ```

以上四点，第一点最重要。对于普通函数内部的this指向函数运行时所在的对象，但是这一点在箭头函数中并不成立。箭头函数没有自己的this对象，内部的this就是定义上层作用域中的this。

也就是说，箭头函数内部的this指向是固定的，普通函数的this指向是可变的

```
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42

//call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

//该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。
```
上述代码中，foo函数内部是箭头函数，foo函数生成是箭头函数的定义才会生效，而她的真正执行要等到100ms之后

如果是普通函数，执行this应该指向全局对象window，输出21

但是箭头函数导致this 总是指向函数定义生效时所在的对象(本例时{id:42})，输出42


**回调函数分别使用箭头函数和普通函数，对比他们的this指向**
```
function Timer(){
  this.s1 = 0;
  this.s2 = 0;
  <!-- 箭头函数 -->
  setInterval(() => this.s1++,1000);
  <!-- 普通函数 -->
  setInterval(function(){
    this.s2++;
  },1000);
}

var timer = new Timer();

setInterval(()=>console.log('s1:',timer.s1),3100); //3
setInterval(()=>console.log('s2:',timer.s2),3100); //0
```
上述代码，Timer内部设置了两个定时器，分别使用箭头函数和普通函数。

箭头函数中的this绑定定义时所在的作用域(即Timer函数)，

后者的this指向运行时所在的作用域(即全局对象)。

所以 3100ms后 timer.s1被更新了3次，而timer.s2一次都没有更新

下面是一个例子，DOM 事件的回调函数封装在一个对象里面。
```
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
```
上述代码的init()方法中，使用了箭头函数里面的this，总是指向handler对象。如果回调函数是普通函数，那么运行this.doSomething()这一行会报错，因为此时this指向的是document对象。

总之，箭头函数没有自己的this，导致内部的this就是外层代码块的this。正是因为他没有自己的this，所以也不能用作构造函数。

除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
```
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```
上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
```
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
```
上述代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

### 5.3 不适用场合
由于箭头函数使得this从“动态”到“静态”，下边有两种场景不应该使用箭头函数。
  1. 第一个场合是定义对象的方法，且该方法内部包括this。
  ```
  const cat = {
    lives: 9,
    jumps: () => {
      this.lives--;
    }
  }
  ```
  cat.jumps()方法是一个箭头函数，这是错误的。
  
  调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；
  
  如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。

  这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
  ```
  globalThis.s = 21;

  const obj = {
    s: 42,
    m: () => console.log(this.s)
  };

  obj.m() // 21
  ```
  上述代码中，obj.m()使用了箭头函数，箭头函数内部的this指向的是全局作用域的对象，所以输出结果21

  **由于以上原因，对象的属性建议使用传统的写法定义，不要用箭头函数定义。**

2. 第二个场合是需要动态的this的时候，也不应该使用箭头函数
  ```
  var button = document.getElementById('press');
  button.addEventListener('click', () => {
    this.classList.toggle('on');
  });
  ```
  上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

另外，如果函数体很复杂，有许多行，或者函数内部**有大量的读写操作**，不单纯是为了计算值，这时**也不应该使用箭头函数**，而是要使用普通函数，这样可以提高代码可读性。


### 5.4 嵌套的箭头函数




## 6. 尾调用优化
### 6.1 什么是尾调用？
### 6.2 尾调用优化
### 6.3 尾递归
### 6.4 递归函数的改写
### 6.5 严格模式
### 6.6 尾递归优化的实现
函数参数的尾逗号
Function.prototype.toString()
catch 命令的参数省略