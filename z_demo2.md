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
箭头函数内部也可以再次使用箭头函数，就是箭头函数的嵌套。
```
//普通函数写法
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

//箭头函数写法
let insert = (value) =>({ into:(arry) => ({after:(afterValue) =>{
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
} }) });

insert(2).into([1, 3]).after(1); //[1, 2, 3]

//indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

//splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
```
上述代码中，array.indexOf(afterValue)指的是在array数组[1,3]中找到与给定元素afterValue(1) 的第一个索引值(0)，此时原代码简化为array.spilce(1,0,2),该代码的含义为：在array数组[1,3]中，从索引为1的位置开始删除0个元素插入2，最后得到数组[1,2,3].

下边是一个部署管道机制(pipeline)的例子，即前一个函数的输出是后一个函数的输入。
```
const pipeline = (...funcs) =>
  val => funcs.reduce((a,b) => b(a),val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
//写法一
const addThenMult = pipeline(plus1, mult2);
addThenMult(5)  // 12
//写法二
mult2(plus1(5))  //12
```
箭头函数还有一个功能，就是可以很方便地改写 λ 演算。
```
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```

## 6. 尾调用优化
### 6.1 什么是尾调用？
尾调用(Tail Call)是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。
```
function f(x){
  return g(x);
}
//函数f的最后一步是调用韩式g，这就叫做尾调用。
```
以下三种情况，都不属于尾调用：
```
//情况1
function f(x){
  let y = g(x);
  return y;
}

//情况2
function f(x){
  return g(x)+1;
}

//情况3
function f(x){
  g(x);
}
```
上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
```
function f(x){
  g(x);
  return undefined;
}
```

尾调用不一定出现在函数尾部，只要是最后一步操作即可。
```
function f(x){
  if(x >0){
    return m(x)
  }
  return n(x);
}
//函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。
```

### 6.2 尾调用优化
注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。

尾调用优化实例
```
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```
注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
```
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```
上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。


### 6.3 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```
//递归写法
//阶乘函数，计算n'的阶乘，最多保存n个调用记录，复杂度O(n)。
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120

//尾递归写法
//尾递归阶乘，只保留一个调用记录，复杂度O(1)。
function factorial(n,total){
  if (n ===1) return total
  return factorial(n-1,n*total)
}
factorial(5,1) // 120
```
还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。(私下了解吧!!)


### 6.4 递归函数的改写
两种方法提高尾递归函数的可读性

方法一是在尾递归函数之外，在提供一个正常形式的函数。
```
function tailFactorial(n,total){
  if (n===1) return total;
  return tailFactorial(n-1,n*total)
}
function factorial(n){
  return tailFactorial(n,1)
}
factorial(5) //120
```
函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。(了解即可 )

方法二是采用ES6的函数默认值
```
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```
总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

### 6.5 严格模式
ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。
```
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
```

### 6.6 尾递归优化的实现
**(不太懂)**

## 7. 函数参数的尾逗号
ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
## 8. Function.prototype.toString()
ES2019 对函数实例的toString()方法做出了修改。

toString()方法返回函数代码本身，以前会省略注释和空格。
```
function /* foo comment */ foo () {}

foo.toString()
// function foo() {}
```
上面代码中，函数foo的原始代码包含注释，函数名foo和圆括号之间有空格，但是toString()方法都把它们省略了。

修改后的toString()方法，明确要求返回一模一样的原始代码。
```
function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"
```
## 9. catch 命令的参数省略
JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
```
try {
  // ...
} catch (err) {
  // 处理错误
}
```
上面代码中，catch命令后面带有参数err。

很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。
```
try {
  // ...
} catch {
  // ...
}
```
