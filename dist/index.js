'use strict';

// 理解ES6的三种声明方式：
// var  变量
// let  局部声明
// const 声明常量-常量是指声明之后不能改变 改变就会报错
console.log('--------------开始-------------------');
var a = 'zhaoxin';
console.log(a);
// 用匿名函数给他进行一个包裹，
// 然后在匿名函数中调用这个a变量，看看能不能调用到。
// 能调用到，就说明是全局的
window.onload = function () {
  console.log(a, '全局');
};
console.log('--------------我是分割线-------------------');

var b = 2;
{
  var b = 3;
}
console.log(b); //b=3 var是全局声明

console.log('--------------我是分割线-------------------');
// ****let 局部声明***
var c = 2;
{
  var _c = 3;
}
console.log(c); //c=2 let 是局部声明
// 此代码 若没有var c=2 时  打印a时就会报错，显示找不到变量。
// 两个例子说明了let是局部变量声明，let声明只在区块内起作用，外部是不可以调用的。
// let是防止你的数据污染
console.log('--------------我是分割线-------------------');
// ** 用var声明的循环 **
// var声明会污染全局空间
for (var i = 0; i < 10; i++) {
  console.log('循环体中:' + i);
}
console.log('循环体外:' + i);

console.log('--------------我是分割线-------------------');
// ** const声明常量**
var d = "JSPang";
//var a='技术胖';
console.log(d);
// 会报错，因为const声明的变量是不可以改变的
