'use strict';

console.log('map数据结构');

// ** Json和map格式的对比 ** map的效率和灵活性更好
var json = {
  name: 'zhaoxin',
  skill: 'dance'
};
console.log(json.name); //这种反应的速度要低于数组和map结构。

var map = new Map();
// key可以设置成数组，值也可以设置成字符串
map.set(json, 'iam');
console.log(map);
// 当然也可key字符串，value是对象
map.set('jspang', json);
console.log(map);

// ** map的增删查**

// map的增加值 用set方法
var json1 = {
  name: 'zhaoxin',
  skill: 'like',
  sex: 'xiaogege'
};
var map1 = new Map();
map1.set(json1, 'xiannv');
map1.set('size', json1);
map1.set('sizeqq', json1);
console.log(map1);

// 取值get
console.log(map1.get('size'));

// size属性
console.log(map1.size);

// 查找是否存在  has
console.log(map1.has('size'));

// 删除delete
map1.delete(json1);
console.log(map1);

// 清除所有元素 clear
map1.clear();
console.log(map1);
