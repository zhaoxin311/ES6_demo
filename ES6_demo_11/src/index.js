console.log('第15节、用proxy进行预处理(Proxy入门)');

// 回顾定义对象的方法
// 声明了一个obj对象，增加了一个对象方法add和一个对象属性name，
var obj={
  add:function (val) {
    return val+10
  },
  name:'zhaoxin'
}
console.log(obj.add(29));
console.log(obj.name);

// 声明proxy
new Proxy({},{})
// 第一个花括号就相当于我们方法的主体，
// 后边的花括号就是Proxy代理处理区域，相当于我们写钩子函数的地方。

// 将obj对象 改为Proxy形式

var pro=new Proxy({
  add:function (val) {
    return val+1
  },
  sex:'nan'
},{
  get:function (target,key,property) {
    console.log('come in get');
    console.log(target,'target');
    console.log(key,'key');
    return target[key]
  },
  set:function (target ,key,value,receiver) {
    console.log(`    seeting ${key}=${value}`);
    return target[key]=value
  }
})
console.log(pro.sex);
pro.sex='nv'
console.log(pro.sex);

// get属性
// get属性是在你得到某对象属性值时预处理的方法，他接受三个参数
// target：得到的目标值
// key：目标的key值，相当于对象的属性
// property：这个不太常用，用法还在研究中，还请大神指教。

// set属性
// set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数。
// target:目标值。
// key：目标的Key值。
// value：要改变的值。
// receiver：改变前的原始值。

// apply的使用
// apply的作用是调用内部的方法，它使用在方法体是一个匿名函数时。
console.log('---------');
let target=function () {
  return 'zhaoxin'
}
let handler={
  apply(target,ctx,args){
    console.log('do apply');
    return Reflect.apply(...arguments);
  }
}
let pro1 =new Proxy(target,handler)

console.log(pro1());


