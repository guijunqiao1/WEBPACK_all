const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports=  {
  mode:"development",
  devtool:"source-map",
  entry:{
    main:"./src/index.js",
    other:"./src/other.js"
  },
  output:{  
    filename:"[name].[hash].js",
  },
  plugins:[
    new CleanWebpackPlugin({
      //要清除的文件或目录
      //排除掉dll目录本身和它里面的文件
      cleanOnceBeforeBuildPatterns:["**/*","!dll","!dll/*"] //使用参数范围的约束完成清除的范围的规定，即元素之间取交集
      //上述目录和文件的匹配方式参考的是globbing pattern
    }),
    new HtmlWebpackPlugin({
      template:"./"
    }),
    new webpack.DLLReferencePlugin({
      manifest : require("./dll/juqery.manifest.json")//该插件的作用表示的是将打包生成的依赖的内容替换为manifest.json清单中提前进行内容
      //存储的内容，并且该实例指定具体的清单导向，并且使得最终运行导出的dist中的js内容的时候根据模块id进行依赖索引的时候使用的是清单中的
      //对应模块id的暴露出来的全局变量中的内容(也就是该依赖原先的生产模式下打包的内容)
    }),
    new webpack.DLLReferencePlugin({
      manifest : require("./dll/lodash.manifest.json")
    })
  ]
}

// 拓展：若require导入的内容明确为json格式的内容，则默认导出的内容为json格式的对象的内容，并且json文件本身并不需要使用导出语句(同时兼容
//的导入语句包含ES6和commonjs)





// 此处需要理清楚使用当前分包的意义：

// 首先总的目的是将lodash、jquery文件的引入直接放置在最终的主html中，并且利用src请求文件之后浏览器会进行缓存的特性完成整个二次传输过程中的
//优化，对于不使用当前manifest.json清单的特性(同时使用dll相关的插件)则是无法完成全局变量的声明直接替换了dist中的assets中的引入的jquery、lodash
//文件的内容的效果的，因为正常打包的结果都是直接放在一起的，而使用了dll相关的插件则能够直接完成全局变量的替换，同时替换之后若实际进行当前的assets中的
//模块代码的运行的时候，当遇到了全局变量之后会和manifest.json中的内容进行对照，并且得到实际的模块id，并且该模块id恰好和先前的主html文件提前引入的文件是
//相互对应的，则在二次传输的时候本质上是进行二次的请求内容获取，则可利用缓存下来的src请求的文件内容进行依赖使用

// 需要注意：直接将lodash和jquery放在主文件中而不使用dll进行处理同样不可取，因为lodash和jquery在assets中的依赖引用的本质还是直接就是文件的内容，而无法被
//manifest清单中的内容重定向为全局变量