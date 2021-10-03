'use strict';

console.log('第五节、字符串模板');
console.log('1. 字符串模板');
// es5写法
var jspang1 = '技术胖';
var blog1 = '非常高兴你能看到这篇文章，我是你的老朋友' + jspang1 + '。这节课我们学习字符串模版。<br>';
document.write(blog1);

// es6写法
var jspang2 = '技术胖';
var blog2 = '\u975E\u5E38\u9AD8\u5174\u4F60\u80FD\u770B\u5230\u8FD9\u7BC7\u6587\u7AE0\uFF0C\u6211\u662F\u4F60\u7684\u8001\u670B\u53CB' + jspang2 + '\u3002\u8FD9\u8282\u8BFE\u6211\u4EEC\u5B66\u4E60\u5B57\u7B26\u4E32\u6A21\u7248\u3002<br>';
document.write(blog2);

// 支持HTML标签
var jspang3 = '技术胖';
var blog3 = '<b>\u975E\u5E38\u9AD8\u5174\u4F60\u80FD\u770B\u5230\u8FD9\u7BC7\u6587\u7AE0</b>\uFF0C\u6211\u662F\u4F60\u7684\u8001\u670B\u53CB' + jspang3 + '\u3002\u8FD9\u8282\u8BFE\u6211\u4EEC\u5B66\u4E60\u5B57\u7B26\u4E32\u6A21\u7248\u3002<br>';
document.write(blog3);

// ** 对运算的支持： **

var a = 1;
var b = 2;
var res = a + b + ' <br>';
document.write(res);

console.log('2. 字符串的查找（支持中文查找）');
// es5 写法
var jspang4 = '技术胖';
var blog4 = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
document.write(blog4.indexOf(jspang4));
// 返回的是 索引的位置 20 此方法不实用

// es6写法
var jspang5 = '技术胖';
var blog5 = '非常高兴你能看到这篇文章，我是你的老朋友技术胖';
document.write(blog5.includes(jspang5));

// *判断开头是否存在： *
document.write(blog5.startsWith(jspang5));
// 判断结尾是否存在：
document.write(blog5.endsWith(jspang5));
// 需要注意的是：starts和ends 后边都要加s，

// ** 复制字符串**
document.write('jspang5|'.repeat(3));
