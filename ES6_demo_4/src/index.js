console.log('第七节、ES6中新增的数组知识(1)');
// ** JSON数组格式转换 **
let  json = {
  '0': 'jspang',
  '1': '技术胖',
  '2': '大胖逼逼叨',
  '3': '逼逼叨',
  length:5
}

let arr=Array.from(json);
console.log(arr)
// 如果length多，则多出的部分为undefined
// 如果length少，则仅显示length数值的长度

// Array.of()方法： 负责把一堆文本或者变量转换成数组。
console.log('1. Array.of()方法：');

let arr1 =Array.of(3,4,5,6);
console.log(arr1);

let arr2 =Array.of('技术胖','jspang','大胖逼逼叨');
console.log(arr2);

// find( )实例方法:
console.log('2. find( )实例方法:');

// 这里的find方法是从数组中查找。
// 在find方法中我们需要传入一个匿名函数，函数需要传入三个参数：
// value：表示当前查找的值。
// index：表示当前查找的数组索引。
// arr：表示当前数组。
let arr3=[1,2,3,4,5,6,7,8,9];
console.log(arr3.find(function(value,index,arr3){
    return value > 10;
}))
// 查找满足条件后即可停止查找
// 控制台输出了6，说明找到了符合条件的值，并进行返回了，如果找不到会显示undefined。

// 不是只能查找数字，还可以查找字符串
let arr4=['jspang','技术胖','技术帅','小仙女']
console.log(arr4.find(function(value,index,arr4){
  return value =='小小仙女'
}));

console.log('第八节、ES6中新增的数组知识(2)');
// fill( )实例方法：
console.log('1. fill( )实例方法：');
// fill()也是一个实例方法，它的作用是把数组进行填充，
// 它接收三个参数，
// 第一个参数是填充的变量，
// 第二个是开始填充的位置，
// 第三个是填充到的位置。
let arr5=[0,1,2,3,4,5,6,7,8,9];
arr5.fill('jspang',2,5);
console.log(arr5);
// 把数组从第二位到第五位用jspang进行填充
// 将234全改成了jspang

console.log('2. 数组的遍历');
console.log('for...of循环：');
let arr6=['za','sha','hehe','haha']
for(let item of arr6){
  console.log(item);
}

console.log('for…of数组索引:');
let arr7=['za','sha','hehe','haha']
for(let index of arr7.keys()){
  console.log(index);
}

console.log('同时输出数组的内容和索引：');
let arr8=['za','sha','hehe','haha']
for(let [index,val] of arr8.entries()){
  console.log(index + ':' +val);
}

console.log('3. entries( )实例方法：');
// entries()实例方式生成的是Iterator形式的数组，
// 那这种形式的好处就是可以让我们在需要时用next()手动跳转到下一个值。
let arr9=['jspang','技术胖','大胖逼逼叨']
let list=arr9.entries();
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);




