console.log('第13节、Set和WeakSet数据结构');

// Set的数据结构是以数组的形式构建的。
// ** Set的声明 **
let setArr=new Set(['zhaoxin','zhaoxin','study','web'])
console.log(setArr); //Set {"jspang", "技术胖", "web"}
// Set和Array 的区别是Set不允许内部有重复的值，如果有只显示一个，相当于去重。
// 虽然Set很像数组，但是他不是数组。

// Set值得增删查
// 追加的的add：
// 在使用Array的时候，可以用push进行追加值，
// 那Set稍有不同，它用更语义化的add进行追加。
setArr.add('zhaoxin shi xiaoxiannv')
console.log(setArr);

//删除delete
setArr.delete('zhaoxin')
console.log(setArr);  //符合的全部删除

// 查找has  用has进行值的查找，返回的是true或者false。
console.log(setArr.has('web'));  //true
console.log(setArr.has('zahoxin'));  //false

// 清除clear
setArr.clear()
console.log(setArr);
 
// set 的for...of...循环
let setArr1=new Set(['zhaoxin','zhaoxin','study','web'])
for(let item of setArr1 ){
  console.log(item);
}

// 此处注意 for in 和for of 的区别
// ？简单来说：for in 遍历键名，for of 遍历键值
// 详解见笔记本

let arr = ["a","b"];
for (let itema in arr) {
    console.log(itema);//0,1
}
 
for ( let itemb of arr) {
    console.log(itemb);//a,b
}
console.log('-----------');
// size 属性  size属性可以获取Set值得数量
console.log(setArr1.size); 
// 因为set自带去重 所以输出结果为 3

// forEach循环
setArr1.forEach((value)=>console.log(value))

// WeakSet的声明
let weakObj=new WeakSet();
let obj={a:'zhaoxin',b:'xinxin'}
let obj1={a:'zhaoxin',b:'xinxin'}
let obj2=obj
weakObj.add(obj)
weakObj.add(obj1)
console.log(weakObj);
weakObj.add(obj2)
console.log(weakObj);

// 注意观察 第一次log 和第二次log 是否有不同

// 总结：在实际开发中Set用的比较多，WeakSet用的并不多，
// 但是他对传入值必须是对象作了很好的判断，我们灵活应用还是有一定的用处的。


