# ES6 笔记之第九章 数组的扩展

## 1. 扩展运算符
### 1.1 含义
扩展运算符是三个点(...)。它好比rest参数的逆运算，讲一个数组转为用逗号分隔的参数序列。

该运算符只要用于函数调用
```
function push (array,...items){
  array.push(...items);
}

function add(x,y){
  return x+y;
}

const numbers = [4,32]
add(...number) //36
```
上边代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，他们都使用了扩展运算符。该运算符将一个数组，变为参数序列。

```
//扩展运算符可以和正常的函数参数结合使用
function f(a,s,d,f,g){ }
const args = [0,1];
f(1,...args,3,...[5,7]);

//扩展运算符后面还可以放置表达式
const arr =[
  ...(x>0?['a']:[ ]),
  'b',
];

//如果扩展运算符最后是一个空数组，则不产生任何效果。
[...[],1]  //[1]

//注意，只有在函数调用时，扩展运算符才可以使用圆括号，否则报错。
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
//上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。

```

### 1.2 替代函数的 apply 方法
由于扩展运算符可以展开数组，所以就不需要apply方法，将数组转为函数的参数了，
```
//ES5的写法
function f(x,y,z){......}
var args = [1,2,3]
f.apply(null,args);

//ES6的写法
function f(x,y,z){......}
let args = [1,2,3]
f(...args)
```
1. 扩展运算符代替apply的例子，应用Math.max方法，简化求数组的最大元素。
```
//ES5写法
Math.max.apply(null,...[1,2,3])
//ES6写法
Math.max(...[1,2,3])
//等同于
Math.max(1,2,3)
```
2. 通过push 将一个数组添加到另一个数组的尾部的例子
```
//ES5的写法
const arr1 = [1,2,3,4];
const arr2 = [7,7,5];
Array.prototype.push.apply(arr1,arr2);

//ES6的写法
let arr1 = [1,2,3,4];
let arr2 = [7,7,5];
arr1.push(...arr2);
```
上面代码的 ES5 写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

3. 另一个例子
```
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);
```

### 1.3 扩展运算符的应用
#### (1) 复制数组
数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
```
const a1 = [1,2,3];
const a2 = a1;

a2[0]=2;
a1   //[2,2,3]
```
上述代码中，a2并不是a1的克隆，而是指向同一组数据的另一个指针。修改a2，会直接改变a1.

```
//es5只能用变通的方法来复制数组
const a1 = [1,2,3];
const a2 = a1.concat();
a2[0]=2;
a1   //[1,2,3]
a2   //[2,2,3]

//扩展运算符提供了复制数组的简便写法
  const a1 = [1, 2];
  // 写法一
  const a2 = [...a1];
  // 写法二
  const [...a2] = a1;
//上面的两种写法，a2都是a1的克隆。
```
```
//concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。
```

#### (2) 合并数组
扩展运算符提供了数组合并的新写法
```
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
//不过，这两种方法都是浅拷贝，使用的时候需要注意。深拷贝和浅拷贝的区别wolai笔记本
console.log(-----------------------)
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
//上述代码中,a3,a4是用两种不同的方法合并而成的新数组，但是他们的元素都是对原数组元素的引用，就是浅拷贝。如果修改了引用变量的值，会同步反馈到新数组
```

#### (3) 与解构赋值结合
1. 扩展正运算符可以和解构赋值结合用于生成数组
```
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

//slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
```

2. 例子
```
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```
3. 如果将扩展运算符用于数组赋值，只能将参数放在最后一位，否则会报错。
```
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

#### (4) 字符串
扩展运算符还可以将字符串转为真正的数组
```
//1.
[...'hello']
// [ "h", "e", "l", "l", "o" ]

//2.
//采用扩展运算符能够正确返回字符串长度的函数
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

//3.
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3


//4.如果不用扩展运算符，字符串的reverse操作就不正确。
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```
split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 

reverse() 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

#### (5) 实现了Iterator接口的对象
任何定义了遍历器接口的对象，都可以用扩展运算符转为真正的数组。
```
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个NodeList对象。他不是一个数组，而是一个类似数组的对象。这里 能够转为真正数组的原因是因为NodeList对象实现了Iterator。

对于没有部署Iterator接口的类似数组的对象，可以使用Array.from()方法将其转化为真正的数组。
```
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];

console.log(Array.from(arrayLike)) //转化为真正的数组
```

#### (6) Map 和 Set 结构，Generator 函数
扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，东瓯可以使用扩展运算符，比如Map结构。
```
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr1 = [...map.keys()]; // [1, 2, 3]
let arr2 = [...map.values()]; // ["one","two","three"]
```
Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
```
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```
上述代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果没有Iterator接口的对象，使用扩展运算符将会报错。

const obj = {a: 1, b: 2};


let arr = [...obj]; // TypeError: Cannot spread non-iterable object


## 2. Array.from()
Array.from()方法可以将两类对象转换为真正的数组：**类似数组的对象**和**可遍历的对象**(包括ES6新增的数据结构Set和Map)
```
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
在实际应用中，常见的数组的对象是DOM操作的返回的NodeList集合，以及函数内部的arguments对象，Array.from都可以将它们转化为真正的数组。
```
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```
上述的代码中，querySelectorAll方法返回的是一个类似数组的对象，可以将这个对象转化为真正的数组，在使用filter方法


只要是部署了Iterator接口的数据结构，Array.from都能将其转为真正的数组
```
Array.from('hello')  //['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a','s'])
Array.from(namesSet)  //['a','s']

//字符串和Set结构都是自带Iterator接口，可以直接使用该方法转为数组

```
如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。

扩展运算符(...)也可以将某些数据结构转为数组。
```
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
```
扩展运算符背后调用的是遍历器接口(Symbol.iterator)，如果一个对象没有部署这个，就无法转换。Array.from 方法还支持类似数组的对象，该对象必须有length属性。总的来说 任何有length 属性的对象都可以通过该方法转为数组，而此时扩展运算符就无法转换。

对于还没有部署该方法的浏览器可以用Array.prototype.slice方法替代。
```
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

Array.from()还可以接收第二个参数，作用类似于数组的map方法。用来对数组的每个元素进行处理，将处理后的值放入到返回的数组中。
```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

//下面的例子是取出一组 DOM 节点的文本内容。
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

//下面的例子将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

//另一个例子是返回各种数据的类型。
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

```
如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

Array.from()方法的另一个应用是将字符串转换为数组，并返回字符串的长度。

## 3. Array.of()
Array.of()方法用于将一组数转换成数组。
```
Array.of(3,11,2)  //[3,11,2]
Array.of(3)  //[3]
Array.of(3,11,2).length  //3
Array.of() // []
Array.of(undefined) // [undefined]

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
这个方法的目的是为了弥补数组构造函数Array()的不足，Array()方法会因为参数个数不同导致行为有差异。

Array()方法只有在参数个数不少于2的时候，才会返回由参数组层的新数组，当参数只有一个正整数时，实际上制定的是数组的长度。

Array.of()基本上可以替代Array()或new Array(),不存在因参数个数不同而曹植的重载。

Array.of()总是返回参数值组成的数组。如果没有参数就返回一个空数组。

Array.of()方法实现原理：
```
function ArrayOf(){
  return [].slice.call(arguments)
}
```

## 4. 数组实例的 copyWithin()
数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置(会覆盖原有成员),然后再返回当前数组。简言之，使用这个方法会修改当前数组。

Array.prototype.copyWithin(target, start = 0, end = this.length)

他接受三个参数(三个参数都为数值，非数值时 会自动转换为数值)：
- target(必需):从该位置开始替换数组。负数表示倒数。
- start(可选)：从该位置开始读取数据，默认为0，负数表示从末尾开始计算。
- end(可选)：到该位置前停止读取数据，默认为当前数组长度。负数代表从末尾开始计算。

小栗子：
```
[1,2,3,4,5].copyWithin(0,3)  //[4,5,3,4,5]
//该代码表示从3号未开始读取直到数组结束的所有成员(4,5),复制到从0号位开始的位置，结果覆盖了原来的1 和 2。
```
更多的栗子：
```
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)  //[4,2,3,4,5]

[1, 2, 3, 4, 5].copyWithin(0, -2, -1)  //[4,2,3,4,5]

[].copyWithin.call({length: 5, 3: 1}, 0, 3) //{0: 1, 3: 1, length: 5}

let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);  //[3,4,5,4,5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);  //[4,2,3,4,5]

```

## 5. 数组实例的 find() 和 findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数直到查找到第一个符合条件的元素，找到返回true,找不到返回undefined。
```
[1,4,-5,10].find((x) => x < 0) //-5

[1,5,10,15].find(function(value,index,arr){
  return value > 9
}) //10
//上述代码中，find的回调函数有三个参数，依次为当前值，当前的位置，原数组。

```

数组实例的findIndex方法的用法与find方法相似，都是返回第一个符合条件的**数组成员的位置**，如果没有元素符合条件就返回-1.
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

上述两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
```
function f(v){
  return v > this.age;
}
let person = {name:'zhaoxin',age:20};
[10,12,26,43].find(f,person)
```
上述代码中，find函数接收了第二个参数person对象，回调函数中的this对象指的就是person对象。

另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
```
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```
上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

## 6. 数组实例的 fill()
fill()方法使用给定值，填充一个数组。
```
//fill方法用于数组的初始化很便利，当数组中已有元素，会被全部抹去。
[q,q,w,e,z].fill(7)  //[7,7,7,7,7]

new Array(3).fill(7) //[7,7,7]
```

fill方法还可以接收第二个和第三个参数。用于指定填充的起始位置和结束位置。
```
[g,f,d,s,a].fill(7,1,3)  //[g,7,7,s,a]
//fill方法从1号位开始，像原始数组填充7，到3号位结束。
```

**注意** 如果填充的类型是对象，那么被赋值的是同一内存地址的对象，而不是深拷贝对象。
```
let arr = new Array(3).fill({name:'zhaoxin'});
arr[0].name = 'xiaoxiannv';
arr  //[{name:'xiaoxiannv'},{name:'xiaoxiannv'},{name:'xiaoxiannv'}]

let arr = new Array(3).fill([])
arr[0].push(5)
arr  //[[5],[5],[5]]
```

## 7. 数组实例的 entries()，keys() 和 values()
三种方法都用于遍历数组，他们都会返回一个遍历器对象。可以使用for...of循环进行遍历，

唯一的区别是keys()是对键名的遍历，values()是对键值的遍历，entries()是对键值对的遍历。
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
如果不使用for...of 循环。可以手动调用遍历器对象的next方法，进行遍历。
```
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## 8. 数组实例的 includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
```
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

该方法可以接受第二个参数，表示搜素的起始位置，默认为0;如果第二个参数为负数，表示倒数的位置;如果第二个参数大于数组的长度，则会重置为从0开始
```
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
**另外**，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
- Map结构的has方法，用于查找键名，例如：Map prototype.has(key)
- Set结构的has方法，用来查找值，例如：Set.prototype.has(value)

## 9. 数组实例的 flat()，flatMap()
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

例如：[1,2,[3,4]].flat()  //[1,2,3,4]

flat()方法可以接受参数，代表想要拉平的层数，默认为1，当参数为Infinity时代表无论多少层嵌套全部拉平转为一维数组

简单理解：参数的含义代表去掉[]的个数，从最内层开始删除
```
[1, 2, [3, [4, 5]]].flat() //[1,2,[3,4,5]]

[1, 2, [3, [4, 5]]].flat(2)  //[1,2,3,4,5]

[1, [2, [3]]].flat(Infinity)  // [1, 2, 3]

//如果原数组有空位，flat()方法会跳过空位。
[1, 2, , 4, 5].flat()  // [1, 2, 4, 5]
```

**flatMap()方法**对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
```
[2, 3, 4].flatMap((x) => [x, x * 2])
//相当于
[[2,4],[3,6],[4,8]].flat()
//结果为  [2,4,3,6,4,8]
```
**注意** flatMap()只能展开一层
```
[2, 3, 4].flatMap((x) => [[x*2]])
//相当于
[[[4]],[[6]],[[8]]].flat()
//结果为  [[4],[6],[8]]
```
flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
```
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```
flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。

## 10. 数组的空位










## 11. Array.prototype.sort() 的排序稳定性







