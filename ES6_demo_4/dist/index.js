'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

console.log('第七节、ES6中新增的数组知识(1)');
// ** JSON数组格式转换 **
var json = {
  '0': 'jspang',
  '1': '技术胖',
  '2': '大胖逼逼叨',
  '3': '逼逼叨',
  length: 5
};

var arr = Array.from(json);
console.log(arr);
// 如果length多，则多出的部分为undefined
// 如果length少，则仅显示length数值的长度

// Array.of()方法： 负责把一堆文本或者变量转换成数组。
console.log('1. Array.of()方法：');

var arr1 = Array.of(3, 4, 5, 6);
console.log(arr1);

var arr2 = Array.of('技术胖', 'jspang', '大胖逼逼叨');
console.log(arr2);

// find( )实例方法:
console.log('2. find( )实例方法:');

// 这里的find方法是从数组中查找。
// 在find方法中我们需要传入一个匿名函数，函数需要传入三个参数：
// value：表示当前查找的值。
// index：表示当前查找的数组索引。
// arr：表示当前数组。
var arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr3.find(function (value, index, arr3) {
  return value > 10;
}));
// 查找满足条件后即可停止查找
// 控制台输出了6，说明找到了符合条件的值，并进行返回了，如果找不到会显示undefined。

// 不是只能查找数字，还可以查找字符串
var arr4 = ['jspang', '技术胖', '技术帅', '小仙女'];
console.log(arr4.find(function (value, index, arr4) {
  return value == '小小仙女';
}));

console.log('第八节、ES6中新增的数组知识(2)');
// fill( )实例方法：
console.log('1. fill( )实例方法：');
// fill()也是一个实例方法，它的作用是把数组进行填充，
// 它接收三个参数，
// 第一个参数是填充的变量，
// 第二个是开始填充的位置，
// 第三个是填充到的位置。
var arr5 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
arr5.fill('jspang', 2, 5);
console.log(arr5);
// 把数组从第二位到第五位用jspang进行填充
// 将234全改成了jspang

console.log('2. 数组的遍历');
console.log('for...of循环：');
var arr6 = ['za', 'sha', 'hehe', 'haha'];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = arr6[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;

    console.log(item);
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

console.log('for…of数组索引:');
var arr7 = ['za', 'sha', 'hehe', 'haha'];
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = arr7.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var index = _step2.value;

    console.log(index);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

console.log('同时输出数组的内容和索引：');
var arr8 = ['za', 'sha', 'hehe', 'haha'];
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = arr8.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _step3$value = _slicedToArray(_step3.value, 2),
        _index = _step3$value[0],
        val = _step3$value[1];

    console.log(_index + ':' + val);
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

console.log('3. entries( )实例方法：');
// entries()实例方式生成的是Iterator形式的数组，
// 那这种形式的好处就是可以让我们在需要时用next()手动跳转到下一个值。
var arr9 = ['jspang', '技术胖', '大胖逼逼叨'];
var list = arr9.entries();
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);
