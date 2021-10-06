'use strict';

console.log('promise对象的使用');

// promise的基本用法

var status = 1;

function step1(resolve, reject) {
  console.log('1. 开始-洗菜做饭');
  if (status == 1) {
    resolve('洗菜做饭--完成');
  } else {
    reject('洗菜做饭--失败');
  }
}

function step2(resolve, reject) {
  console.log('2. 开始-坐下来吃饭');
  if (status == 1) {
    resolve('坐下来吃饭--完成');
  } else {
    reject('坐下来吃饭--失败');
  }
}

function step3(resolve, reject) {
  console.log('3. 开始-收拾桌子洗碗');
  if (status == 1) {
    resolve('收拾桌子洗碗--完成');
  } else {
    reject('收拾桌子洗碗--失败');
  }
}

new Promise(step1).then(function (val) {
  console.log(val);
  return new Promise(step2);
}).then(function (val) {
  console.log(val);
  return new Promise(step3);
}).then(function (val) {
  console.log(val);
});
