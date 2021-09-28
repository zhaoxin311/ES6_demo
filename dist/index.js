'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

console.log('--------------(第二节、新的声明方式)开始-------------------');
// 理解ES6的三种声明方式：
// var  变量
// let  局部声明
// const 声明常量-常量是指声明之后不能改变 改变就会报错
var a = 'zhaoxin';
console.log(a);
// 用匿名函数给他进行一个包裹，
// 然后在匿名函数中调用这个a变量，看看能不能调用到。
// 能调用到，就说明是全局的

// window.onload=function () {
//   console.log(a,'全局');
// }

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
console.log('--------------(第二节、新的声明方式)结束-------------------');

console.log('--------------(第三节、变量的解构赋值)开始-------------------');
console.log('1. 数组的解构赋值：');
// ** 简单的数组解构：**
var aa = 1,
    ab = 2,
    ac = 3; //从数组中提取值，按照位置的对象关系对变量赋值

console.log(aa, ab, ac);

// ** 数组模式和赋值模式统一：**
var ba = 1,
    bb = 2,
    bc = 3,
    bd = 4; //简单来讲就是等号左右形式要统一，不统一解构将失败，返回undefined或者直接报错

console.log(ba, bb, bc, bd);

console.log('2. 解构的默认值：');
// 解构赋值是允许使用默认值的
var _ref = [],
    _ref$ = _ref[0],
    foo = _ref$ === undefined ? true : _ref$;

console.log(foo); //控制台打印出true

var _ref2 = ['技术胖'],
    ca = _ref2[0],
    _ref2$ = _ref2[1],
    cb = _ref2$ === undefined ? "JSPang" : _ref2$;

console.log(ca + cb); //控制台显示“技术胖JSPang”
// console.log(ca+cbv); //控制台显示“技术胖undefined”

// 需要注意的是undefined和null的区别。
var da = '技术胖',
    _undefined = undefined,
    db = _undefined === undefined ? "JSPang" : _undefined;

console.log(da + db); //控制台显示“技术胖JSPang”
// undefined相当于什么都没有，b是默认值。

var dda = '技术胖',
    _ref3 = null,
    ddb = _ref3 === undefined ? "JSPang" : _ref3;

console.log(dda + ddb); //控制台显示“技术胖null”
// null相当于有值，但值为null。所以b并没有取默认值，而是解构成了null。

console.log('3. 对象的解构赋值');
var _afoo$bar = { afoo: 'JSPang', bar: '技术胖' },
    afoo = _afoo$bar.afoo,
    bar = _afoo$bar.bar;

console.log(afoo + bar); //控制台打印出了“JSPang技术胖”
// 注意：对象的解构与数组有一个重要的不同。
// 数组的元素是按次序排列的，变量的取值由它的位置决定；
// 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

console.log('4. 圆括号的使用');

// 如果在解构之前就定义了变量，这时候你再解构会出现问题。
// 下面是错误的代码，编译会报错。

// let foo;
// {foo} ={foo:'JSPang'};
// console.log(foo);

// 要解决报错，使程序正常，只要在解构的语句外边加一个圆括号就可以了。
var aafoo = void 0;
var _aafoo = { aafoo: 'JSPang' };
aafoo = _aafoo.aafoo;

console.log(aafoo); //控制台输出jspang

console.log('5. 字符串解构');
// 字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象

var _Jspang = 'Jspang',
    _Jspang2 = _slicedToArray(_Jspang, 6),
    ea = _Jspang2[0],
    eb = _Jspang2[1],
    ec = _Jspang2[2],
    ed = _Jspang2[3],
    ee = _Jspang2[4],
    ef = _Jspang2[5]; //尽量使用单引号 单引号解压比双引号快


console.log(ea);
console.log(eb);
console.log(ec);
console.log(ed);
console.log(ee);
console.log(ef);

console.log('--------------(第三节、变量的解构赋值)结束-------------------');
console.log('--------------(第四节、扩展运算符和rest运算符)开始-------------------');
// 可以很好的为我们解决参数和对象数组未知情况下的编程
console.log('1. 对象扩展运算符（…）：');
// 当编写一个方法时，我们允许它传入的参数是不确定的。这时候可以使用对象扩展运算符来作参数
function jspang() {
  console.log(arguments.length <= 0 ? undefined : arguments[0]);
  console.log(arguments.length <= 1 ? undefined : arguments[1]);
  console.log(arguments.length <= 2 ? undefined : arguments[2]);
  console.log(arguments.length <= 3 ? undefined : arguments[3]);
}
jspang(1, 2, 3);
console.log('2. 扩展运算符的用处：');
var arr11 = ['www', 'jspang', 'com'];
var arr12 = arr11; //赋值的是整个数组
console.log(arr12);
arr12.push('shengHongYu');
console.log(arr11);
// ['www','jspang','com']
// ['www','jspang','com','shengHongYu']
var arr21 = ['www', 'jspang', 'com'];
//let arr2=arr1;
var arr22 = [].concat(arr21); //赋值的是数组里的元素
console.log(arr22);
arr22.push('shengHongYu');
console.log(arr22);
console.log(arr21);
// ['www','jspang','com']
// ['www','jspang','com','shengHongYu']
// ['www','jspang','com']

console.log('2. rest运算符');
function jspang1(first, second) {
  //第一个参数first是确定的
  console.log(arguments.length <= 2 ? 0 : arguments.length - 2);
  console.log(first, 'first'); //1
  console.log(second, 'second');
}
jspang1(1, 441, 9, 1, 1, 1, 9, 1, 11, 9, 1); //10
console.log('------------------分割线-------------');
// 如何循环输出rest运算符
// for…of的循环可以避免我们开拓内存空间，增加代码运行效率
function jspang2(first) {
  console.log(first, 'first');

  for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arg[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;

      console.log(val);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
jspang2(0, 1, 2, 3, 4, 5, 6, 7);

console.log('--------------(第四节、扩展运算符和rest运算符)结束-------------------');
