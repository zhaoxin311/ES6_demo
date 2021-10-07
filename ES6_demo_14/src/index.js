console.log('模块化操作');
// 模块化操作主要包括两个方面。
// export :负责进行模块化，也是模块的输出。
// import : 负责把模块引入，也是模块的引入操作。

// ** export的用法：**
// export 可以把变量 函数 对象 进行模块化，提供外部调用接口，让外部进行引用

// 这就是一个最简单的模块的输出和引入。
import {a} from '../ES6_demo_14/temp.js'
console.log(a);

// 多变量的输出
var a='zhaoxin'
var b=' shi '
var c='xiaoxiannv'

export {a,b,c}

// 函数的模块化输出
export function add(a,b) {
  return a+b
}

// as 的用法 给模块更改一个更有语义化的名称
export{
  // x as a,
  // y as b,
  // z as c
}

// export default的使用 加上default相当是一个默认的入口。
// 在一个文件里export default只能有一个。
// 我们来对比一下export和export default的区别

// 1. export
export var aa='jsapng'

export function add(bb,cc) {
  return bb+cc
}
// 对应的导入方式
import {aa,add} from '../ES6_demo_14/temp'



// 2.export defalut
// export default var a='jspang'

// 对应的导入方式
import str from '../ES6_demo_14/temp'

