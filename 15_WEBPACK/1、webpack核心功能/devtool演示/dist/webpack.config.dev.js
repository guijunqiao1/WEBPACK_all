"use strict";

var path = require("path");

module.exports = {
  mode: "development",
  entry: {
    //打包的入口文件配置,在开发者模式下为require("./main.js")的形式
    // main:"./src/index.js", //属性名chunk名称，属性值入口模块(启动模块)
    // a:"./src/a.js", //第二个chunk的名称以及入口模块
    main: ["./src/index.js", "./src/a.js"] //启动模块有2个,但是在当前的chunk下产生的asset和先前的一个启动模块的情况都是只有一个
    //这种和上述使用两个chunk的区别在于：当前的一个chunk中存在两个asset资源并且在自身chunk中进行合并最终生成的assets和第一种情况
    //等价，但是在当前的main这个chunk中的依赖列表会比第一种情况的一个chunk的依赖列表的内容要多;这种情况下由于本质只有一个chunk则在
    //asset中也就是编译后的结果文件a.hash值.js文件中的依赖的引入本质是包含了index.js以及a.js的所以后续只需要引入一个该chunk对应的
    //asset文件到html中即可完成所有模块的导入,同时在assets中的引入顺序(可以在编译后的目标文件中查看require()引入字段)和当前数组的元素
    //的顺序一致
    //使用数组的方式进行chunks打包入口文件的配置的时候需要注意排在后面的文件一定是导出给前面的文件使用的

  },
  output: {
    //打包的出口文件配置，打包返回的文件的配置项
    // filename: "script/main.js",//配置的是合并的chunk中资源(assets)js文件名的规则
    // filename:"script/[name].[hash:5].js",//[name]表示动态匹配上entry中的不同chunk名对应上的assets的名称,[hash]用于打包过程中分析当前内容是否发生改变进而进行是否相同的赋值的判断,用于html引入的名称发生改变进而使得浏览器进行二次请求而不会由于同名文件的请求而忽略进而使用缓存的文件内容
    //同时使用:加上数字的语法完成具体哈希位数的指定，用于assets名称的美观，同时表示的是总的hash，也就是所有的assets共用的hash值，其中一个chunk中的内容发生改变导致的hash发生改变的同时其它的assets的hash同样变成相同的值
    filename: "script/[name].[chunkhash:5].js",
    //[chunkhash]用于表示当前的chunk单独的hash值，并且当前的chunk中的内容发生改变并不会导致所有的assets的hash值发生改变同时不同的chunk之间的hash不同，相同的chunk的不同的内容的hash也不同--这种情况可以合理提示浏览器使用缓存机制
    //需要注意上述的[name]也可以用[id]这种chunkid的形式完成动态命名，但是由于开发环境和生产环境的chunk的id和name相等的情况不一致所以产生的assets文件的名称也会不一致不宜于维护故使用chunk的name命名
    path: path.resolve(__dirname, "target") //必须配置一个绝对路径，表示资源放置的文件夹,默认为根目录下的dist目录

  },
  // devtool:"source-map",//指定打包后调试的文件的品质
  watch: true,
  //固定开启打包监控--和nodemon同理
  module: {
    //配置模块--主要配置的是模块解析(loader)的时候的规则
    rules: [{
      test: /index\.js$/,
      //正则表达式,匹配模块的路径,其中\.为转义为.的含义，$表示匹配的字符串结束
      use: [{
        loader: "./loaders/loader1" //加载器的路径,在实际加载(load)的过程中会自动使用require语句对module.exports导出的加载器进行获取

      }, //每个加载器的使用是一个对象
      {
        loader: "./loaders/loader2"
      }] //匹配到了之后使用什么加载器

    }, //规则2
    {
      test: /\.js$/,
      use: [{
        loader: "./loaders/loader3"
      }, {
        loader: "./loaders/loader4"
      }]
    } //规则1--之所以是倒叙是因为规则的对照顺序为自下而上
    ] //模块的匹配规则

  }
}; // 补充：
// module.exports = {
//   mode: "development",//开发模式，便于开发调试打包的编译结果，另外还有production值用于生产压缩内容
//   entry: "./src/main.js",//打包的入口文件配置,在开发者模式下为require("./main.js")的形式
//   output: {//打包的出口文件配置，打包返回的文件的配置项
//     filename: "bindle.js",//指定出口文件名
//   },
// }
//需要注意此处配置文件导出的规范必须是commonJS，这和webpack支持多模块化并不矛盾，原因在于：
//webpack所支持的多模块化指的是在webpack在node环境下对产生依赖关系的文件之间进行多模块化的支持并且完成合并，而此处的配置文件只会在
//webpack刚开始进行打包的时候执行类似require("./webpack.confog.ts")的内容，也就是在node环境下执行了这样的引入语句(固定为commonJS的规范)，则
//在最初的非打包的情况下所支持的规范应当按照node环境下的语法规范(什么规范导出的就使用什么规范进行导入)，别搞混了,总结：刚开始执行的webpack指令会实际执行到
//require("webpack.config.ts");这个语句，所以需要规范，而打包过程中则并不会执行多模块的引入和导出只是兼容其存在并作为标识进行合并处理罢了
//此处加深概念：
// 使用webpack指令执行当前的文件中错误的内容会报错而在其它被打包的文件中的错误不会报错(本质原因在于webpack打包过程中只有配置文件会被node执行)