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
(1)不能放到数值的最前边或者最后边。例如：_1464301 ，1464301_
(2)不能有两个或者两个以上的分隔符连在一起。例如：123__345
(3)小数点前后不能使用分隔符。例如：3_.14 3._14
(4)在科学计数法里边，表示指数的e 和 E 前后不能使用分隔符。例如：1_e12  1e_12
(5)分隔符不能紧跟着进制的前缀0b、0B、0o、0O、0x、0X。


重点注意：
以下三个函数，不支持数值分隔符：
  Number()      Number('123_456') // NaN
  parseInt()    parseInt('123_456') // 123
  parseFloat()  parseFloat('0.123_234') //0.123

## 3. Number.isFinite(), Number.isNaN()
(1)Number.isFinite()用来检查一个数值是否是有限的(finite),即不是无限的(Infinity)
如果参数类型不是数值 一律返回false
例如：
  Number.isFinite(NaN / Infinity / -Infinity / 'foo' / '12' / true)  //这些情况 全部返回false
  Number,isFinite(15 / 0,3)  //返回true
(2)Number.isNaN()用来检查一个值是否为NaN
如果参数类型不是NaN 一律返回false
例如：
  Number.isNaN(12 / '12' / true / 'foo')  //返回false
  Number.isNaN(NaN / (9/NaN) / ('true'/0) / (0/'foo') / ('true'/'true'))  //返回true

比较：
传统的全局方法isFinite()和isNaN()是 先调用Number()将非数值的值转为数值，在进行判断。
而这两种新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只对于NaN才返回true，其他一律返回false

## 4. Number.parseInt(), Number.parseFloat()
这两种方法 在ES5 和 ES6中 只是写法略有不同，其目的是逐步减少全局方法，使得语言逐步模块化
  // ES5的写法
  parseInt('12.34') // 12
  parseFloat('123.45#') // 123.45

  // ES6的写法
  Number.parseInt('12.34') // 12
  Number.parseFloat('123.45#') // 123.45

  Number.parseInt === parseInt // true
  Number.parseFloat === parseFloat // true

## 5. Number.isInteger()
用来判断一个数值是否为整数
在JavaScript内部，整数和浮点数采用相同的储存方法 所以21和21.0被视为同一个值
  Number.isInteger(25) // true
  Number.isInteger(25.0) // true

如果参数不是数值，Number.isInteger返回false。
  Number.isInteger( 空格 / null / '12' / true)  //返回false

注意：
(1)如果小数点的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位 ，会导致部分小数点后数字丢失
  例如：Number.isInteger(3.0000000000000002) // true
(2)如果一个数值的绝对值小于Number.MIN_VALUE（5E-324）,即小于JavaScript能够分辨的最小值，就会被自动转为0.Number.isInteger也会误判
  例如：
  Number.isInteger(5E-324) // false
  Number.isInteger(5E-325) // true
5E-325由于值太小，会被自动转为0，因此返回true。

对于数值的精确度要求较高的 不建议使用Number.isInteger()来判断该数值是否为整数。


## 6. Number.EPSILON













安全整数和 Number.isSafeInteger()
Math 对象的扩展
Math.trunc()
Math.sign()
Math.cbrt()
Math.clz32()
Math.imul()
Math.fround()
Math.hypot()
对数方法
双曲函数方法
BigInt 数据类型
简介
BigInt 函数
转换规则
数学运算
其他运算











