console.log('第十一节、ES6中的对象');

// 对象赋值
let name = 'zhaoxin'
let skill = 'study'
var obj={name ,skill}
console.log(obj);

// 对象key值构建
let key='skill'
var obj2={
  [key]:'web'
}
console.log(obj2);
console.log(obj2.skill);

// 自定义对象方法
// 对象方法就是把兑现中的属性，用匿名函数的形式编程方法。
var obj3={
  add :function (a,b) {
    return a+b
  }
}
console.log(obj3.add(3,9));

// ** Object.is( ) 对象比较**
var objj1 = {name:'jspang'};
var objj2 = {name:'jspang'};
console.log(objj1.name === objj2.name);//true
// 那ES6为我们提供了is方法进行对比。
console.log(Object.is(objj1.name,objj2.name)); //true
// 区分=== 和 is方法的区别
console.log(+0===-0); //true
console.log(NaN===NaN); //false
console.log(Object.is(+0,-0));  //false
console.log(Object.is(NaN,NaN)); //true
// ===为同值相等，is()为严格相等。

// Object.assign( )合并对象
var aa={aa:'zhaoxin'}
var bb={bb:' shi '}
var cc={cc:' xiaoxiannv'}
let dd=Object.assign(aa,bb,cc)
console.log(dd);

















