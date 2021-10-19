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













