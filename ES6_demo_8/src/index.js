console.log('Symbol在对象中的作用');
// symbol 全局标记 
// 声明symbol
var a = new String;
var b = new Number;
var c = new Boolean;
var d = new Array;
var e = new Object; 
var f= Symbol();
console.log(typeof(a),typeof(d),typeof(f));

// Symbol 的打印
var g =Symbol()
console.log(g);  //红色的Symbol()
console.log(g.toString());  //黑色的Symbol()

// Symbol在对象中的应用
// ？如何用Symbol构建对象中的key 并调用和赋值
var zx=Symbol()
var obj={
  [zx]:'zhaoxin'
}
console.log(obj[zx]); //调用
obj[zx]='xinxinbaobei'//赋值
console.log(obj[zx]);

// Symbol对象元素的保护作用
// 没有进行保护的写法：
var obj1={
  name1:'zhaoxin',
  skill1:'study',
  age1:'18'
}
for(let item1 in obj1){
  //比较两次输出的结果 不同
  console.log('1.' + obj1[item1]);
  console.log('2.' + item1);
}

// 用Symbol进行保护的写法：
var obj2={
  name2:'zhaoxin',
  skill2:'study'
}
let age =Symbol()
obj2[age]=18
for(let item in obj2){
  console.log(obj2[item]);
}
console.log(obj2);






