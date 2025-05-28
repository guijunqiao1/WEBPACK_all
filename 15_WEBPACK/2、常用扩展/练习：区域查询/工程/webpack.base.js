
//公共配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry:{//入口配置项目--下方规定有两个chunks
    list:"./src/list/index.js",
    detail:"./src/detail/index.js"
  },
  output:{
    filename:"scripts/[name].[chunkhash:5].js"
  },
  stats:{//控制台输出配置项
    modules:false,
    colors:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./public/list.html",
      filename:"list.html",
      chunks:["list"]//此处控制当前生成的模板html中的内容是否和原先的内容进行映射关系的赋值
    }), 
    new HtmlWebpackPlugin({
      template:"./public/detail.html", 
      filename:"detail.html",
      chunks:["detail"]//此处控制当前生成的模板html中的内容调用的
    }),
    new CopyWebpackPlugin({
      patterns:[
        { from:"./public",to:"./" } //需要注意两次属性所相对的路径发生了改变
      ]
    })
  ]
}
