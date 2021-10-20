# ES6 笔记之第十章 对象的扩展

## 1. 属性的简洁表示
ES6允许直接在大括号里边书写变量和函数，作为对象的属性和方法。

```
//demo1
const foo = 'bar';
const baz = {foo}
baz  //{foo:"bar"}

//等同于
const baz = {foo:foo}

//demo2
function f(x,y){
  return {x,y}
}

//等同于
function f(x,y){
  return {x:x,y:y}
}
f(1,2) //Object {x:1,y:2}
```





## 2. 属性名表达式
JavaScript定义对象的属性，有两种方法。
```
//方法一 直接用标识符作为属性名
obj.foo = true;

//方法二 用表达式作为属性名，这是要把表达式放在方括号之内
obj['a' + 'bc'] = 123;
```

**注意** 属性名表达式与简洁表达式，不能同时使用

## 3. 方法的name属性
函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

所以，name属性可以返回函数名也可以返回方法名

对象的方法使用了取值函数(getting)和存值函数(setting)，name属性不是在该方法上面，而是在方法属性的描述对象的get和set属性上面，返回的是方法名上加get和set
```
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```
有两种特殊情况：

bind方法创造的函数，name属性返回bound加上原函数的名字。

Function构造函数创造的函数，name属性返回anonymous

```
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

如果对象的方法是一个Symbol值，那么那么属性返回的是这个Symbol值得描述。

```
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```
key1队形的Symbol值有描述，key2没有。


