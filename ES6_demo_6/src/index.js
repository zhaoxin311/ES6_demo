const str = '000123abc456def';
const regex = /(\d+)([a-z]+)(\d+)([a-z]+)/g;

function replacer(match, p1, p2, p3,p4, offset, string) {
  return [p1, p2, p3,p4].join(' - ');
}


console.log(str.replaceAll(regex, replacer));
// 123 - abc - 456

console.log('第十节、ES6中的函数和数组补漏');

// ** 对象的函数解构 **
let json = {
  a:'jspang',
  b:'技术胖'
}
function fun({a,b}){
  console.log(a,b);
}
fun(json);

// 数组的函数解构
let arr = ['jspang','技术胖','免费教程'];
function fun1(a1,b1,c1){
    console.log(a1,b1,c1);
}
fun1(...arr);

// in的用法
// in是用来判断对象或者数组中是否存在某个值的。

// 对象的判断

let obj={
  a2:'zhaoxin',
  b2:'zhaoxinxin'
}
console.log('a2' in obj); //true

// 数组的判断

let arr2=[,,,,,,]
console.log(0 in arr2); //false

let arr3=['zhaoxin','zhao','xin']
console.log(2 in arr3); //true //2是指 下标为2的位置是否为空

// 数组的遍历方法
let arr4=['zhaoxin','zhao','xin']
arr4.forEach((value,index)=>console.log(index+':'+value))
// forEach循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。
arr4.filter(x=>console.log(x))

arr4.some(x=>console.log(x))

// map在这里起到一个替换的作用，
console.log(arr4.map(x=>'web'));
arr4.map(x=>console.log(x))

console.log(arr4.join('|'));

console.log(arr4.toString());






