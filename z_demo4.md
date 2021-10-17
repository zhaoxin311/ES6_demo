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



### 1.1 含义