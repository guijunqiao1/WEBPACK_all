var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin  = require("html-webpack-plugin");
var CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  output:{
    filename:"/scripts/[name][hash:5].js",
  },
  Plugin:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:"./public/index.html"
    }),
    new CopyPlugin([
      { from:"./public",to:"./" }
    ])
  ]
}


//复制的含义为将from中的内容copy到to中(原封不动)
//需要注意的是from中的路径相对的是webpack打包的工作目录，而to中的路径相对的是打包后的dist目录


// 遵循同名不copy的原则