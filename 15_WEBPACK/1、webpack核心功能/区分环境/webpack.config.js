const devConfig = require("./webpack.dev");//由于为js文件故不需要使用.js后缀自动添加，同时使用了路径的表示方式则表明该模块并不是node_modules中的依赖
const proConfig = require("./webpack.pro");
const baseConfig = require("./webpack.base");

module.exports = function(env){//此为匿名函数的写法(箭头函数的本质也是匿名函数)
  console.log("env:"+env);
  if(env && env==="pro"){//若传参指定环境为生产环境
    return {
      ...proConfig,
      ...baseConfig
    }
  }
  else {
    return {
      ...devConfig,
      ...baseConfig
    }
  }
}

//传统的webpack指令若没有直接或者间接指明配置文件则默认使用的是工作目录下的webpack.config.js文件

// 此处配置文件中导出的内容和先前直接导出的对象的区别在于：
// 1、若为函数则在node环境下直接执行该函数，同时将函数的返回结果作为导出的内容(一般是对象)
// 2、在1的情况下，webpack打包配置对象初始化过程中env参数为指定当前执行的webpack指令的--env中后续跟上的参数
// 3、在2的情况下，env参数的赋值存在几种特例：
// （1）webpack --env.a = 1 ==>env = {a:1}
// （2）webpack --env.a ==> env = {a:true}
// （3）webpack --env = 1 ==> env = 1