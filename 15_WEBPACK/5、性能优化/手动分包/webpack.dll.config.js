const webpack = require("webpack");
const path = require("path");


module.exports=  {
  mode:"production",
  entry:{
    juqery:["jquery"],
    lodash:["lodash"] 
  },
  output:{
    filename:"dll/[name].js",
    library:"[name]", //每个bundle暴露的全局变量名
    libraryTarget:"var" //暴露的内容的类型，默认值为var,表示的是以全局变量的形式进行暴露;
    //若为umd则表示的是统一模块化的方式进行暴露
  },
  plugins:[
    new webpack.DllPlugin({
      path:path.resolve(__dirname,"dll","[name].manifest.json"),//该配置控制清单文件的位置,同时最后/后续的内容控制了文件名,同时[name]占位chunk的名称
      name:"[hash][name]" //控制清单中的具体的全局内容的属性名称--一般需要和library配置的名称保持一致
    })
  ]

}

//当前为动态链接库配置文件，以下为补充的解释：
//1、首先配置为生产环境的打包，表示的是将当前的模块作为整体固定的目标资源进行暴露
//2、使用了webpack的内置DLL插件的时候要求入口配置中的每个chunk对应的入口文件的书写的形式应当是数组--因为在当前使用了dll插件的读取方式是
//按照入口文件为数组的情况进行读取的



//能够利用该打包后的文件进行分包优化的原因在于：
//首先在打包之后生成的manifest.json文件中存在该文件打包列表，并且在主chunks文件中若存在依赖关系则优先使用了分包后的依赖文件，例如：
//在资源列表中原先应当为：
// /node_modules/juqery/dist/juqery.js:
// function(module,exports,__webpack_require__){
//   module.exports = ...--实现代码
// }
// /node_modules/lodash/dist/lodash.js:
// function(module,exports,__webpack_require__){
//   module.exports = ...--实现代码
// }

// 在使用了manifest.json文件进行清单索引之后则变成了:
// /node_modules/juqery/dist/juqery.js:
// function(module,exports,__webpack_require__){
//   module.exports = juqery;//manifest文件中暴露出来的全局变量
// }
// /node_modules/lodash/dist/lodash.js:
// function(module,exports,__webpack_require__){
//   module.exports = lodash;//manifest文件中暴露出来的全局变量
// }

//补充：manifest.json清单文件的具体结构，例如：
// juqery juqery dll/juqery.js  
// lodash lodash dll/lodash.js