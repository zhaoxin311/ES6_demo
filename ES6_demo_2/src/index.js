console.log('第五节、字符串模板');
console.log('1. 字符串模板');
// es5写法
let jspang1='技术胖';
let blog1 = '非常高兴你能看到这篇文章，我是你的老朋友'+jspang1+'。这节课我们学习字符串模版。<br>';
document.write(blog1);

// es6写法
let jspang2='技术胖';
let blog2 = `非常高兴你能看到这篇文章，我是你的老朋友${jspang2}。这节课我们学习字符串模版。<br>`;
document.write(blog2);

// 支持HTML标签
let jspang3='技术胖';
let blog3 = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${jspang3}。这节课我们学习字符串模版。<br>`;
document.write(blog3);

// ** 对运算的支持： **

let a=1
let b=2
let res=`${a+b} <br>`
document.write(res)

console.log('2. 字符串的查找（支持中文查找）');
// es5 写法
let jspang4='技术胖';
let blog4 = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
document.write(blog4.indexOf(jspang4));
// 返回的是 索引的位置 20 此方法不实用

// es6写法
let jspang5='技术胖';
let blog5 = '非常高兴你能看到这篇文章，我是你的老朋友技术胖';
document.write(blog5.includes(jspang5));

// *判断开头是否存在： *
document.write(blog5.startsWith(jspang5));
// 判断结尾是否存在：
document.write(blog5.endsWith(jspang5))
// 需要注意的是：starts和ends 后边都要加s，

// ** 复制字符串**
document.write('jspang5|'.repeat(3))

