# ES6 笔记之第七章 数值的扩展

## 1. 二进制和八进制表示法
二进制：Ob 或者 二进制：Ob
八进制：Oo 或者 八进制：OO
在严格模式下，八进制不再使用前缀O表示，ES6明确表示 要使用前缀Oo表示

如果要将Ob和Oo前缀的字符串数值转换成十进制 要使用Number方法
例如：
```
Number('Ob111')  //7
Number('Oo10')  //8
```

## 2. 数值分隔符
使用数值分隔符时 有几个注意点：

1. 不能放到数值的最前边或者最后边。例如：_1464301 ，1464301_
2. 不能有两个或者两个以上的分隔符连在一起。例如：123__345
3. 小数点前后不能使用分隔符。例如：3_.14 3._14
4. 在科学计数法里边，表示指数的e 和 E 前后不能使用分隔符。例如：1_e12  1e_12
5. 分隔符不能紧跟着进制的前缀0b、0B、0o、0O、0x、0X。


重点注意：
以下三个函数，不支持数值分隔符：
```
  Number()      Number('123_456') // NaN
  parseInt()    parseInt('123_456') // 123
  parseFloat()  parseFloat('0.123_234') //0.123
```

## 3. Number.isFinite(), Number.isNaN()
1. Number.isFinite()用来检查一个数值是否是有限的(finite),即不是无限的(Infinity)
如果参数类型不是数值 一律返回false
例如：
```
  Number.isFinite(NaN / Infinity / -Infinity / 'foo' / '12' / true)  //这些情况 全部返回false
  Number,isFinite(15 / 0,3)  //返回true
  ```

2. Number.isNaN()用来检查一个值是否为NaN
如果参数类型不是NaN 一律返回false
例如：
```
  Number.isNaN(12 / '12' / true / 'foo')  //返回false
  Number.isNaN(NaN / (9/NaN) / ('true'/0) / (0/'foo') / ('true'/'true'))  //返回true
```

比较：
传统的全局方法isFinite()和isNaN()是 先调用Number()将非数值的值转为数值，在进行判断。

而这两种新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只对于NaN才返回true，其他一律返回false

## 4. Number.parseInt(), Number.parseFloat()
这两种方法 在ES5 和 ES6中 只是写法略有不同，其目的是逐步减少全局方法，使得语言逐步模块化
```
  // ES5的写法
  parseInt('12.34') // 12
  parseFloat('123.45#') // 123.45

  // ES6的写法
  Number.parseInt('12.34') // 12
  Number.parseFloat('123.45#') // 123.45

  Number.parseInt === parseInt // true
  Number.parseFloat === parseFloat // true
```

## 5. Number.isInteger()
用来判断一个数值是否为整数
在JavaScript内部，整数和浮点数采用相同的储存方法 所以21和21.0被视为同一个值
```
  Number.isInteger(25) // true
  Number.isInteger(25.0) // true
  如果参数不是数值，Number.isInteger返回false。
  Number.isInteger( 空格 / null / '12' / true)  //返回false
```

注意：
1. 如果小数点的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位 ，会导致部分小数点后数字丢失
```
  例如：Number.isInteger(3.0000000000000002) // true
```

2. 如果一个数值的绝对值小于Number.MIN_VALUE（5E-324）,即小于JavaScript能够分辨的最小值，就会被自动转为0.Number.isInteger也会误判
  例如：
```
  Number.isInteger(5E-324) // false
  Number.isInteger(5E-325) // true
```
5E-325由于值太小，会被自动转为0，因此返回true。

对于数值的精确度要求较高的 不建议使用Number.isInteger()来判断该数值是否为整数。

### 6. Number.EPSILON
表示极小的常量 表示1与大于1的最小的浮点数之间的差

对于64位浮点数来说 大于1 的最小浮点数相当于二进制的1.00...001，小数点后有连续51个零。这个数值减去1之后，就等于2的-52次方。

```
Number.EPSILON === Math.pow(2,-52) //true
Number.EpSILON  //2.220446049250313e-16
Number.EPSILON.toFixed(20)   // "0.00000000000000022204"
toFixed(n) 方法可把 Number 四舍五入为指定小数位数n的数字。
```
Number.EPSILON实际上是JavaScript能够表示的最小精度，引入的目的是 为浮点数计算 设置一个误差范围。
```
0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'

0.1 + 0.2 === 0.3 // false
```
Number.EPSILON可以用来设置“能够接受的误差范围”

误差范围设为2的-50次方（即 Number.EPSILON * Math.pow(2,2)）即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。
```
5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)  // true
```
因此，Number.EPSILON的实质是一个可以接受的最小误差范围。
```
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

## 7.安全整数和 Number.isSafeInteger()
JavaScript能够表示的整数范围为 -2^53 到 2^53 之间(不含两个端点)，超过这个范围 无法精确表示这个值 。
```
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1  // true
```
上边代码中，超过2的53次方之后 就不精确了

ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
```
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```
Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
```
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER + 1) // true
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER - 1) // true
```
函数的实现：
```
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}
```
使用这个函数时,需要注意.验证运算结果是否落在安全整数的范围内,不要只验证运算结果,同时还要验证参与运算的每个值.
```
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
```
某个数超出了精度范围，导致在计算机内部，以9007199254740992的形式存储
```
9007199254740993 === 9007199254740992
// true
```
所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。
```
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
```

### 扩展 Math.round()
主要分为两种情况：
1. 形如 Math.round(n)

此类实行**向右取整**的方法 对于数字 .5 有效
```
Math.round(1.5) = 2,
Math.round(-1.5) = -1
```
2. 形如 Math.round(2.60f)

此时应该返回**最接近它的整数**，若有两个返回接近的整数，则取最大的那个，
```
Math.round(2.40f) = 2
Math.round(-2.40f) = -2
```

## 8.Math 对象的扩展
ES6在Math对象上新增了17个与数学相关的方法。这些方法都是静态方法只能在Math对象上调用

### 8.1 Math.trunc()
Math.trunc()该方法用于去除一个数的小数部分，返回整数部分
```
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```
对于非数值，Math.trunc内部使用Number方法将其先转为数值
```
Math.trunc('123.234')   //123
Math.trunc(true)   //1
Math.trunc(false)   //0
Math.trunc(null)   //0
```
对于空值和无法截取整数的值 返回NaN
```
Math.trunc(NaN)  //NaN
Math.trunc('foo')  //NaN
Math.trunc()  //NaN
Math.trunc(undefined)  //NaN
```
该方法原理：
```
Math.trunc = Math.trunc || function(x){
  return x <0 ? Math.ceil(x) : Math.floor(x);
};

Math.ceil() 函数返回  大于或等于一个给定数字的最小整数。
Math.floor() 函数返回 小于或等于一个给定数字的最大整数。
```

### 8.2 Math.sign()
Math.sign()方法用来判断一个数到底是正数、负数、还是零。对于非数值 会将其先转换成数值。

他会返回五种值：

* 参数为正数，返回+1
* 参数为负数，返回-1
* 参数为0，返回0
* 参数为-0，返回-0
* 其他值，返回NaN

```
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
```
如果参数为非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN
```
Math.sign('')          //0
Math.sign(true)        //+1
Math.sign(false)       //0
Math.sign(null)        //0
Math.sign('9')         //+1
Math.sign('f00')       //NaN
Math.sign()            //NaN
Math.sign(undefined)   //NaN
```
该方法原理：
```
Math.sign = Math.sign || function(x){
  x = +x;
  if(x === 0 || isNaN(x)){
    return x;
  }
  return x > 0 ? 1 : -1;
}
```

### 8.3 Math.cbrt()
Math.cbrt() 该方法用于计算一个数的立方根
```
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(8)  // 2
Math.cbrt(2)  // 1.2599210498948732
```
对于非数值，会先使用Number()方法将其转换成数值
```
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```
该方法的原理：
```
Math.cbrt = Math.cbrt || function(x){
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
}

Math.pow() 函数返回基数（base）的指数（exponent）次幂.
Math.pow(2,3)  //2的3次方 8 

Math.abs(x) 函数返回指定数字 “x“ 的绝对值。
Math.abs(-2);       // 2
```

### 8.4 Math.clz32()
Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```





### 8.5 Math.imul()

### 8.6 Math.fround()

### 8.7 Math.hypot()

## 16.对数方法
## 17.双曲函数方法
## 18.BigInt 数据类型
## 19.简介
## 20.BigInt 函数
## 21.转换规则
## 22.数学运算
## 23.其他运算











