const btn = document.querySelector("button");
btn.onclick = async function(e){
  //动态加载
  //impor函数 是ES6的草案
  //浏览器会使用jsonp的方式远程去读取一个js模块
  //import函数 会返回一个promise ( * as obj )
  // const { chunk } = await import(/* webpackChunkName:"lodash" */"lodash-es");//动态引入依赖的方式，故tree shaking无法对当前依赖进行处理
  const { chunk } = await import(/* webpackChunkName:"lodash" */"./utils");//对于utils介质依赖文件中的import {chunk} from "lodash-es"而言属于静态引入依赖的方式故tree shaking会对依赖内容进行处理,完成内容的筛选的效果
  const result = chunk([3,5,6,7,87],2);
  console.log(result);
}

// 此类懒加载js代码的方式需要注意的是，在经过了webpack打包之后是存在着所有的依赖文件的内容的，但是在实际启动项目的时候实际使用上的文件内容是不包含着
//条件加载的js文件的,当触发条件之后进行js文件的加载的时候,需要注意使用的是目标目录中的assets清单中导向的js文件的内容,也就是使用了webpack生产环境下
//打包过程中的tree shaking过后的内容的,在触发之前生产环境下的assets文件中的全局变量webpack Jsonp中是没有该模块的信息的，但是触发之后则在webpack Jsonp全局变量中
//是存在着该模块的内容信息的