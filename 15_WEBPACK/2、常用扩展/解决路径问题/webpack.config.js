var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  output:{
    filename:"/scripts/[name][hash:5].js",
    publicPath:"/"//配置公共路径，在打包生成main.js中的静态资源中的__webpack_require__.p属性中进行等价赋值--
    //影响多个插件多个加载器生成内容的路径中的相对的符号直接替换为当前的取值作为绝对路径存在,能够有效避免加载器或者插件生成的
    //输出文件中的内容中的解析后的路径或者未解析的路径访问不到按理能够访问到的资源内容的问题
  },
  module:{
    rules:{
      test:/\.(png)|(jpg)|(eng)$/,
      use:[{
        loader:"file-loader",
        options:{
          name:"imgs/[name][hash:5].[ext]",
          publicPath:"/"//同时可以针对该加载器进行自身生成的内容中的路径中的相对内容替换为当前自身的publicPath属性值的效果的完成
        }
      }]
    }
  },
  Plugin:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      template:"./public/index.html",
      filename:"home.html",
      chunks:["home"],
    })
  ],
  devServer:{
    port:8000,
    open:true,
    openPage:"html/index.html"
  }
}


//补充：
// 相对路径的典型：./  或者../开头
// 上述提到的绝对路径 /开头,并且和站点的根url进行拼接间接的完成绝对路径的制作
//纠正：替换后不一定就是绝对路径也可以是其它，总之publicPath属性仅起到替换原先的相对符号的内容的作用

// 同时自己(加载器、插件)中的publicPath的优先级大于总的在output中配置的publicPath的优先级