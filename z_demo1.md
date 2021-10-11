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

计算一个数的 32 位二进制形式的前导 0 的个数
```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```
左移运算符(<<)与Math.clz32 方法直接相关

对于小数。Math.clz32()方法只考虑整数部分。
```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

Math.clz32(3.2) //30
Math.clz32(3.5) //30
```
对于空值或者其他类型的值，Math.clz32()方法 会将它们先转为数值，让后再计算。
```
Math.clz32()  //32
Math.clz32(NaN)  //32
Math.clz32(Infinity)  //32
Math.clz32(null)  //32
Math.clz32('foo')  //32
Math.clz32([])  //32
Math.clz32({})  //32
Math.clz32(true)  //31
```

### 8.5 Math.imul()
Math.imul()方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位带符号的整数。
```
Math.iuml(2,4)  //8
Math.iuml(-1,8)  //-8
Math.iuml(-2,-2)  //4
```
如果只考虑32位，在大多数情况下，该方法math.iuml(a,b)与a*b 的结果是相同的。等同于(a*b)|0的效果(超过32位的部分溢出)

该方法的出现，是因为JavaScript的精度有限，超过2的53次方的值无法精确表示，就是说，对于很大的数的乘法，低位数值往往都是不精确的，该方法可以返回正确的低位数值。
```
(0x7fffffff * 0x7fffffff)|0 // 0

Math.imul(0x7fffffff, 0x7fffffff) // 1
```
上面乘法算式返回结果为0。因由于这两个二进制数的最低位都是1，所以乘法的结果肯定错误。根据二进制乘法，计算的结果的二进制位最低位也应该是1,。这里出现错误是因为，他们的乘积超过了2的53次方，JavaScript无法保留格外额精度，就把最低位的值都变成了0.

由于以上原因，Math.iuml()方法的出现就解决了此类问题，该方法可以返回正确的结果  结果为1。

### 8.6 Math.fround()
Math.fround()方法返回一个数的32位单精度浮点数形式

对于32位单精度格式来说，数值精度是24位（1位隐藏位和23位有效位），对于-2的24次方到2的24次方之间的整数(不含两个端点)，返回的结果与参数本身保持一致。
```
Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215
```
如果参数的绝对值超过了2得24次方，则返回得结果会失去精度。
```
Math.fround(2 ** 24)   // 16777216
Math.fround(2 ** 24 + 1)   // 16777216
```
Math.fround()方法的主要作用是将64位双精度浮点数转换为32位单精度浮点数。

如果小数的精度超过24个二进制位，返回值就不同于原值。否则，返回值与64位双精度值保持一致。
```
// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1
```
对于NaN和Infinity，此方法会返回原值。对于其他类型的非数值，该方法会先将其转换成数值类型，再返回单精度浮点数
```
Math.fround(NaN)    //NaN
Math.fround(Infinity) //Infinity

Math.fround('5')      // 5
Math.fround(true)     // 1
Math.fround(null)     // 0
Math.fround([])       // 0
Math.fround({})       // NaN
```
该方法实现原理：
```
Math.fround = Math.fround || function(x){
  return new Float32Array([x])[0]
}

Float32Array 类型数组代表的是平台字节顺序为32位的浮点数型数组(对应于 C 浮点数据类型) 。
```

### 8.7 Math.hypot()
Math.hyot()方法返回所有参数的平方和的平方根。
```
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```
如果参数不是数值，该方法会将其转换成数值，只有一个参数无法转换成数值，结果就返回NaN。

### 8.8 对数方法
ES6新增了4个对数相关方法
1. Math.expm1()
Math.expm1(x)返回e的x次方再减去1，即Math.exp(x)-1
```
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
```
该方法相关原理代码解释：
```
Math.expm1 = Math.expm1 || function(x){
  return Math.exp(x)-1
}

Math.exp(1);  // 2.718281828459045
Math.exp() 函数返回 ex，x 表示参数，e 是自然对数的底数，值为2.718281828459045。
```

2. Math.log1p()
Math.log1p()方法返回 1+x 的自然对数，即Math.log(1+x)。如果x小于 -1，返回NaN。
```
Math.log1p(1)===Math.log(2)
Math.log1p(0)===Math.log(1)
Math.log1p(-1)===Math.log(0)  //-Infinity
Math.log1p(-2)===Math.log(-1)  //NaN
```
该方法相关原理代码解释：
```
Math.log1p = Math.log1p || function(x){
  return Math.log(x+1);
} 
```

3. Math.log10()
Math.log10()该方法返回以10为底的x的对数。如果x为0,则返回-Infinity，如果x<0,则返回NaN
```
Math.log10(2)  //
Math.log10(1)
Math.log10(0)  //-Infinity
Math.log10(-2) //NaN
Math.log10(100000)  //5
```
该方法相关原理代码解释：
```
Math.log10 = Math.log10 ||function(x){
  return Math.log(x) / Math.LN10;
}

Math.LN10 属性表示 10 的自然对数，约为 2.302：
```

4. Math.log2()
Math.log2()方法返回以2为底的x的对数，如果x为0,则返回-Infinity，如果x<0,则返回NaN
```
Math.log2(3)
Math.log2(2)
Math.log2(1)  //0
Math.log2(0)  //-Infinity
Math.log2(-1) //NaN
Math.log2(-2) //NaN
Math.log2(1024) //10
Math.log2(536870912)  //29
Math.log2(1 << 29)  //1 << 29 等于536870912
```
该方法相关原理代码解释：
```
Math.log2 = Math.log2 ||function(x){
  return Math.log(x) / Math.LN2;
}

Math.LN2 属性表示 2 的自然对数，约为 0.693
```

### 8.9 双曲函数方法
ES6新增了六个双曲函数方法。
- Math.sinh(x)返回x的双曲正弦。
- Math.cosh(x)返回x的双曲余弦。
- Math.tanh(x)返回x的双曲正切。
- Math.asinh(x)返回x的反双曲正弦。
- Math.acosh(x)返回x的反双曲余弦。
- Math.atanh(x)返回x的反双曲正切。

## 9.BigInt 数据类型
### 9.1 简介
JavaScript将所有的数字都保存成64位浮点数，会有两大限制：

1. 数值的精度只能到53位二进制位（相当于16位十进制位），大于这个范围的整数，JavaScript无法精确表示。

2. 大于或者等于2的1024次方的数值，JavaScript无法表示，会返回Infinity。
```
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
```
ES2020引入了第八种数据类型BigInt (大整数)，来解决这个问题，BigInt只能表示整数，没有位数的限制，任何位数的整数都能精确表示

数据类型分类：基本数据类型 和 引用数据类型
1. 基本数据类型：
  - 整数类型：byte、short、int、long
  - 浮点数类型：float、double
  - 字符类型：chart
  - 布尔类型：boolean
2. 引用数据类型;
  - 类
  - 接口
  - 数组

```
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

为了与Number类型区分，BigInt类型的数据必须添加后缀n
1234 // 普通整数
1234n // BigInt
// BigInt 的运算
1n + 2n // 3n

BigInt 同样可以使用各种进制表示，都要加上后缀n
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制

BigInt 与普通整数是两种值，他们之间并不相等
42n === 42 //false

typeof运算符对于 BigInt 类型的数据返回bigint。
typeof 123n //'bigint'

BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
-42n  //正确
+42n  //报错
```
JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。现在，BigInt可以计算。
```
let p = 1;
for (let i = 1; i <= 70; i++) {
  p *= i;
}
console.log(p); // 1.197857166996989e+100

let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n
```

### 9.2 BigInt 函数 (后半部分不太明白)
将其他类型的数据转换成BigInt类型，转换规则基本与Number()一致。
```
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
```
BigInt()函数必须有参数，而且参数必须可以正常转换成数值，下边实例都会报错：
```
new BigInt() // new BigInt() // TypeError
BigInt(undefined) //TypeError 类型错误
BigInt(null) // TypeError
BigInt('123n') // SyntaxError  语法错误
BigInt('abc') // SyntaxError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError

//参数如果是小数 也会报错
BigInt(1.5)  //RangeError  范围错误
BigInt('1.5')  // SyntaxError
```
BigInt 继承了Object对象的两个实例方法
- BigInt.prototype.toString()
- BigInt.prototype.valueOf()

还继承了Number对象的实例方法
- BigInt.prototype.toLocaleString()

此外还提供了三个静态方法
- BigInt.asUintN(width,BigInt) : 给定的BigInt转为0到2的width次方-1之间对应的值。
- BigInt.asIntN(width,BigInt) : 给定的BigInt转为-2的width减1次方到2的width减1次方减1之间对应的值。
- BigInt.parseInt(string[,radix]) : 近似于NUmber.parseInt(),将一个字符串转换成指定进制的BigInt。

```
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max)
// 9223372036854775807n
BigInt.asIntN(64, max + 1n)
// -9223372036854775808n
BigInt.asUintN(64, max + 1n)
// 9223372036854775808n
```
max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。

如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。
```
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(32, max) // -1n
BigInt.asUintN(32, max) // 4294967295n
```
上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。
```
// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n
```
上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。

对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。

### 9.3 转换规则
可以使用Boolean() 、Number()、和 String()这三种方法，将BigInt可以转换成布尔值、数值和字符串类型
```
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1" 转为字符串时后缀n会消失。
```
另外，取反运算符(!)也可以将BigInt转为布尔值。
```
!0n // true
!1n // false
```

### 9.4 数学运算
数学运算方面，BigInt类型的 + - * 和 ** 这四个二元运算符，与Number类型的行为一致。除法运算 / 会舍去小数部分，返回一个整数部分。例如： 9n / 5n   // 1n

几乎所有的数值运算符都可以用在BigInt，但是有两个例外：
- 不带符号的右移位运算符  >>>
- 一元的求正运算符  +
这两个运算符用在BigInt会报错，前者因为>>>运算符是不带符号的，但是BigInt总是带符号的，导致该运算符无意义，完全等同于右移运算符>>.后者是因为一元运算符+在asm.js里面总是返回Number类型，为了不破坏 asm.js 就规定+1n会报错。

注意：BigInt 不能与普通数值进行混合运算。 1n + 1.3 // 报错
上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。

同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。
```
// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2
```
上面代码中，Math.sqrt的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用Number方法转一下类型，才能进行计算。

asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错。

1n | 0 // 报错

### 9.5 其他运算











