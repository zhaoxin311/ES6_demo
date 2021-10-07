'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('class类的使用');

// 类的声明

var Coder = function () {
  function Coder() {
    _classCallCheck(this, Coder);
  }

  _createClass(Coder, [{
    key: 'name',
    value: function name(val) {
      console.log(val);
    }
  }]);

  return Coder;
}();

// 类的使用  
// 实例化类  并使用类里的方法


var jspang = new Coder();
jspang.name('jspang');
console.log('------------分割线------------');

// 类的多方法声明

var Coder1 = function () {
  function Coder1() {
    _classCallCheck(this, Coder1);
  }

  _createClass(Coder1, [{
    key: 'name',
    value: function name(val) {
      console.log(val, 'val');
      return val; //没有return 下边就没法找到name
    }
  }, {
    key: 'skill',
    value: function skill(val) {
      console.log(this.name('zhaoxin') + ':' + 'skill is ' + val);
    }
  }]);

  return Coder1;
}();
// this指类本身，还有要注意return 的用法。


var zhaoxin = new Coder1();
zhaoxin.name('zhaoxin');
zhaoxin.skill('dance');
console.log('------------分割线------------');

// 类的传参
// 在类的参数传递中我们用constructor( )进行传参。
// 传递参数后可以直接使用this.xxx进行调用。

var Coder2 = function () {
  _createClass(Coder2, [{
    key: 'name',
    value: function name(val) {
      console.log(val);
      return val; //没有return 下边就没法找到name
    }
  }, {
    key: 'skill',
    value: function skill(val) {
      console.log(this.name('zhaoxin') + ':' + 'skill is ' + val);
    }
  }]);

  function Coder2(a, b) {
    _classCallCheck(this, Coder2);

    this.a = a;
    this.b = b;
  }
  // 用constructor来约定了传递参数，然后用作了一个add方法，把参数相加。


  _createClass(Coder2, [{
    key: 'add',
    value: function add() {
      return this.a + this.b;
    }
  }]);

  return Coder2;
}();

var zx = new Coder2(2, 7);
console.log(zx.add());
console.log('------------分割线------------');

// class的继承

var htmler = function (_Coder) {
  _inherits(htmler, _Coder);

  function htmler() {
    _classCallCheck(this, htmler);

    return _possibleConstructorReturn(this, (htmler.__proto__ || Object.getPrototypeOf(htmler)).apply(this, arguments));
  }

  _createClass(htmler, [{
    key: 'like',
    value: function like(val) {
      return this.name('zhaoxin like' + val);
    }
  }]);

  return htmler;
}(Coder2);

var pang = new htmler();
pang.name('技术胖');
pang.like('小哥哥');
