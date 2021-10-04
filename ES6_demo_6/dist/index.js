'use strict';

var str = '000123abc456def';
var regex = /(\d+)([a-z]+)(\d+)([a-z]+)/g;

function replacer(match, p1, p2, p3, p4, offset, string) {
  return [p1, p2, p3, p4].join(' - ');
}

console.log(str.replaceAll(regex, replacer));
// 123 - abc - 456

console.log('第十节、ES6中的函数和数组补漏');

// ** 对象的函数解构 **
var json = {
  a: 'jspang',
  b: '技术胖'
};
function fun(_ref) {
  var a = _ref.a,
      b = _ref.b;

  console.log(a, b);
}
fun(json);

// 数组的函数解构
var arr = ['jspang', '技术胖', '免费教程'];
function fun1(a1, b1, c1) {
  console.log(a1, b1, c1);
}
fun1.apply(undefined, arr);

// in的用法
// in是用来判断对象或者数组中是否存在某个值的。

// 对象的判断

var obj = {
  a2: 'zhaoxin',
  b2: 'zhaoxinxin'
};
console.log('a2' in obj); //true

// 数组的判断

var arr2 = [,,,,,,];
console.log(0 in arr2); //false

var arr3 = ['zhaoxin', 'zhao', 'xin'];
console.log(2 in arr3); //true //2是指 下标为2的位置是否为空

// 数组的遍历方法
var arr4 = ['zhaoxin', 'zhao', 'xin'];
arr4.forEach(function (value, index) {
  return console.log(index + ':' + value);
});
// forEach循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。
arr4.filter(function (x) {
  return console.log(x);
});

arr4.some(function (x) {
  return console.log(x);
});

// map在这里起到一个替换的作用，
console.log(arr4.map(function (x) {
  return 'web';
}));
arr4.map(function (x) {
  return console.log(x);
});

console.log(arr4.join('|'));

console.log(arr4.toString());
