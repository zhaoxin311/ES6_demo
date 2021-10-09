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
> ### 扩展 Math.round()
> 主要分为两种情况：
> 1. 形如 Math.round(n)
> 
> 此类实行**向右取整**的方法 对于数字 .5 有效
> ```
> Math.round(1.5) = 2,
> Math.round(-1.5) = -1
> ```
2. 形如 Math.round(2.60f)

此时应该返回**最接近它的整数**，若有两个返回接近的整数，则取最大的那个，
```
Math.round(2.40f) = 2
Math.round(-2.40f) = -2
```






## 8.Math 对象的扩展
## 9.Math.trunc()
## 10.Math.sign()
## 11.Math.cbrt()
## 12.Math.clz32()
## 13.Math.imul()
## 14.Math.fround()
## 15.Math.hypot()
## 16.对数方法
## 17.双曲函数方法
## 18.BigInt 数据类型
## 19.简介
## 20.BigInt 函数
## 21.转换规则
## 22.数学运算
## 23.其他运算











