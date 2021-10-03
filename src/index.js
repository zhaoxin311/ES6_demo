console.log('第六节、ES6数字操作');
console.log('1. 二进制和八进制');

// 二进制  Binary
let binary = 0B010101;
console.log(binary);  //21
// 八进制  Octal
let b=0o666;
console.log(b);   //438

// ** 数字判断和转换**
// ** 数字验证Number.isFinite( xx )**
let a= 11/4;
console.log(Number.isFinite(a));//true
console.log(Number.isFinite('jspang'));//false
console.log(Number.isFinite(NaN));//false
console.log(Number.isFinite(undefined));//false

//NaN验证
// NaN是特殊的非数字 可以使用Number.isNaN来进行验证
console.log(Number.isNaN(NaN));  //true

// 判断是否为整数Number.isInteger(xx)
let c=123.2
console.log(Number.isInteger(c));  //false

// 整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)
let d='9.18';
console.log(Number.parseInt(d));   //9
console.log(Number.parseFloat(d));   //9.18

// ** 整数取值范围操作 **
// 整数的操作是有一个取值范围的，它的取值范围就是2的53次方。
let  e= Math.pow(2,53)-1;
console.log(e); //9007199254740991
// 在我们计算时会经常超出这个值，所以我们要进行判断，ES6提供了一个常数，叫做最大安全整数，以后就不需要我们计算了。

// 最大安全整数
console.log('最大安全整数');
console.log(Number.MAX_SAFE_INTEGER);
// 最小安全整数
console.log('最小安全整数');
console.log(Number.MIN_SAFE_INTEGER);

// 安全整数判断isSafeInteger( )
let f= Math.pow(2,53)-1;
let g= Math.pow(2,53)+1;
let h= Math.pow(2,53);
console.log(Number.isSafeInteger(f));//true
console.log(Number.isSafeInteger(g));//false
console.log(Number.isSafeInteger(h));//false


