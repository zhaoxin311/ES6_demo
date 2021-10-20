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

## 4. 属性的可枚举性和遍历
### 4.1 可枚举型
对象的每个属性都有一个描述对象，用来控制属性的行为。

Object.getOwnPropertyDescriptor方法可以获取该属性的描述方法。
```
let obj = {foo:123};
Object.getOwnPropertyDescriptor(obj,'foo')

//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```
描述对象的enumerable属性，成为可枚举，如果该属性为 false，表示某些属性操作会忽略当前属性。

目前，有四个操作会忽略enumerable为false的属性。

- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

### 4.2 属性的遍历
ES6一共有5种方法可以遍历对象的属性
(1) for...in  循环遍历对象自身的和继承的可枚举属性（不包含Symbol属性）

(2) Object.keys(obj)  返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不包含Symbol属性）的键名

(3) Object.getOwnPropertyNames(obj)  返回一个数组，包括对象自身的所有属性（不包含Symbol属性，但是包含不可枚举属性）的键名

(4) Object.getOwnPropertySymbols(obj)  返回一个数组，包含对象自身的所有Symbol属性的键名。

(5) Reflect.ownKeys(obj)  返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```
返回一个数组，包含参数对象的所有属性，次序为：首先数值属性2和10，其次字符串属性b和a，最后是Symbol属性。

## 5. super关键字
this 关键字 总是指向函数所在的当前对象，ES6有新增了另一个类似关键字 super ，指向当前对象的原型对象。
```
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};
//通过super.foo 引用了原型对象proto的foo属性。
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```
Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

obj  要设置其原型的对象。prototype  该对象的新原型(一个对象 或 null).

**注意** super关键字表示原型对象时，只能用在对象的方法中，用在其他方法都会报错，

```
// 报错  super用在属性里边
const obj = {
  foo: super.foo
}

// 报错  super用在一个函数里面，然后赋值给foo属性。
const obj = {
  foo: () => super.foo
}

// 报错  super用在一个函数里面，然后赋值给foo属性。
const obj = {
  foo: function () {
    return super.foo
  }
}
```

JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
```
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```
上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。

this 关键字 谁调用指向谁














