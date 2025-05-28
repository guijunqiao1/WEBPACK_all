var webpack = require("webpack");

module.exports = {
  mode:"development",
  devtool:"source-map",
  Plugin:[
    new webpack.DefinePlugin({//该插件的本质可以理解为向着AST语法树中添加了新的替换依据，并且在编译解析的过程中完成替换并且将替换后并且完成编译的内容提交到main.js中
      PI:`Math.PI`, //PI = Math.PI --属性字符串的值就是常量的值，此为该常量定义插件中在对象中进行属性赋值的情况下若值为使用了引号进行内容的包裹，则该层引号其中的内容会被赋值给该属性名对应的属性
      VERSION:"`1.0.0`", //VERSION = "1.0.0" 
      DOMAIN:JSON.stringify("duyi.com") // DOMAIN:""duyi.com"" => DOMAIN = "duyi.com"
    }),
    new webpack.BannerPlugin({//用于在输出的目录中的main.js文件中的顶部添加上横幅信息，此处包括hash，即所有生成的hash的字符串拼接总和、chunkhash，即所有生成的chunkhash的拼接总和(资源合并的时候提到过)、name，即当前的文件名(main.js)，以及其它的固定信息
      banner:`
      hash:[hash]
      chunkhash:[chunkhash]
      name:[name]
      author:yuanjin
      corporation:duyi
      `
    }),
    new webpack.ProvidePlugin({//用于公共引入内容,下方补充有案例
      $:"jquery",
      _:"lodash"
    })
  ]
}


// 补充：对于第三个webpack内置插件ProvidePlugin，其真实在main.js中的打包结果为：
// index.js : 
// __webpack_require = (function(){
//   (function(_,$){
//     var r1 = $("div");
//     var r2 = _.drop([1,2,3],2);
//     console.log(r1,r2);
//   }).call(this,__webpack_require("lodash"),__webpack_require("jquery"))
// })()
//并没有造成全局变量污染的可能性问题的产生