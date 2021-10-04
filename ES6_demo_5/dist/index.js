'use strict';

console.log('第九节、ES6中的箭头函数和扩展');

function add1(a1, b1) {
  return a1 + b1;
}
console.log(add1(1, 2)); //3

// ** 默认值 **

function add2(a2) {
  var b2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return a2 + b2;
}
console.log(add2(3)); //4

function add3() {
  var a3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var b3 = arguments[1];

  return a3 + b3;
}
console.log(add3(3)); //NaN

// 主动抛出错误

function add4() {
  var a4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (a4 == 0) {
    throw new Error('this is error');
  }
  return a4 + b4;
}
console.log(add4(1));

// ** 函数中的严谨模式 **
// S6中我们可以写在函数体中，相当于针对函数来使用。


//巨大一坑  使用了默认值，再使用严谨模式的话，就会有冲突
function add5(a5, b5) {
  'use strict';

  if (a5 == 0) {
    throw new Error('This is error');
  }
  return a5 + b5;
}

console.log(add5(1, 4));

// ** 获得需要传递的参数个数 **

function add6(a6, b6) {
  'use strict';

  if (a6 == 0) {
    throw new Error('This is error');
  }
  return a6 + b6;
}
console.log(add6.length); //2

function add7(a7) {
  var b7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (a7 == 0) {
    throw new Error('This is error');
  }
  return a7 + b7;
}
console.log(add7.length); //1

// 通过比较发现 方法(xxx.length) 得到的是必须要传入的参数数量

// 箭头函数
var add8 = function add8(a8) {
  var b8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return a8 + b8;
};
console.log(add8(9));

// {}的使用
var add8 = function add8(a8) {
  var b8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  //如若 先return 后 log 则 log 失效 注意顺序
  console.log('{}的使用');
  return a8 + b8;
};
console.log(add8(9));

// 箭头函数中不可加new，也就是说箭头函数不能当构造函数进行使用。
