console.log('class类的使用');

// 类的声明
class Coder{
  name(val){
    console.log(val);
  }
}

// 类的使用  
// 实例化类  并使用类里的方法
let jspang = new Coder
jspang.name('jspang')
console.log('------------分割线------------');

// 类的多方法声明
class Coder1{
  name(val){
    console.log(val,'val');
    return val;  //没有return 下边就没法找到name
  }
  skill(val){
    console.log(this.name('zhaoxin')+':'+'skill is '+val);
  }
}
// this指类本身，还有要注意return 的用法。
let zhaoxin=new Coder1
zhaoxin.name('zhaoxin')
zhaoxin.skill('dance')
console.log('------------分割线------------');

// 类的传参
// 在类的参数传递中我们用constructor( )进行传参。
// 传递参数后可以直接使用this.xxx进行调用。
class Coder2{
  name(val){
    console.log(val);
    return val;  //没有return 下边就没法找到name
  }
  skill(val){
    console.log(this.name('zhaoxin')+':'+'skill is '+val);
  }
  constructor(a,b){
    this.a=a;
    this.b=b
  }
// 用constructor来约定了传递参数，然后用作了一个add方法，把参数相加。
  add(){
    return this.a+this.b
  }
}
let zx = new Coder2(2,7)
console.log(zx.add());
console.log('------------分割线------------');

// class的继承
class htmler extends Coder2{
  like(val){
    return this.name('zhaoxin like'+val)
  }
}
let pang =new htmler
pang.name('技术胖')
pang.like('小哥哥')








