var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  entry:{
    home:"./src/index.js",
    a:"./src/a.js"
  },
  output:{
    filename:"/scripts/[name][hash:5].js",
  },
  Plugin:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:"./public/index.html",
      filename:"home.html",
      chunks:["home"]
    }),
    new HtmlWebpackPlugin({
      template:"./pubilc/a.html",
      filename:"a.html",
      chunks:["a"]
    })
  ]
}

// 原理：当assets emit的时候：1、利用fs模块生成一个页面文件；2、给文件内容的合适的位置添加一个script元素；3、元素的src引用打包后的js文件地址

// 注意：调用多个Plugin实例的本质在于生成多个dist中的打包后的html模板内容。
//同时需要注意的是chunks参数用于当前所在实例控制生成的模板html使用哪个chunk，并且分批复制则使用数组否则使用all进行一键导入（即
//多个script标签中src引入了多个assets），同时需要注意分批复制的名称为chunk的名称--提醒：chunk生成assets

//需要注意此处将html直接放置在dist中和下节的Copy插件中的from和to之间的区别在于此处得到的内容中自动添加上了script的引入语句(自动计算解析路径)


// 需要注意由于Plugin对象本质的函数中可以操作assets，故能够访问到生成的各个资源文件内容，故在生成的模板html内容中引入部分的url会被自动解析
//成和原先引入的源一致的后续改变了路径的源的路径(即自动识别索引转化功能)

// 最重要的是：注意chunks中指定的内容和最终生成的html中script中引入的内容的应当保持一致，同时需要和本身确实需要引入的模块的文件保持一致、以及需要和output中
//输出到dist中的文件的文件的内容应当保持一致