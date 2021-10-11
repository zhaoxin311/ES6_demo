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
### 1.4 函数的 length 属性
### 1.5 作用域
### 1.6 应用












rest 参数
严格模式
name 属性
箭头函数
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