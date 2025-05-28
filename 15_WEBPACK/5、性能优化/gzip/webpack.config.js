const {CleanWebpackPlugin} = require("clean-webpack-plguin");
const CompressionWebpackPlugin = reqire("compression-webpack-plugin");


module.exports = {
  mode:"development",
  devtool:"source-map",
  plugins:[
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename:"[file].gz", //控制生成的压缩文件的文件名,其中[file]表示源生成可能的整个文件名占位符
      test:/main\.js/ //控制仅针对main.js文件进行压缩
    })
  ]
}

// 需要注意当前压缩后的内容在启动服务器进行当前内容的运行的时候，默认固定了提示给启动项目的服务器的压缩方式为gzip了，那么对应浏览器进行内容的渲染的时候，
//固定使用了gizp的方式进行内容的解压，这种直接固定了压缩方式的提示的方式不能利用服务器的灵活性，即通过分析代码的结构选择合理的解压方式完成内容的解压决策，
//一般正常情况下是浏览器通过使用请求头中的特殊字段提示给服务器可允许的压缩方式使得服务器进行压缩的决策并且将压缩后的内容提交给浏览器以及响应头中的固定字段提示浏览器
//具体的压缩方式利于浏览器直接的解压


// 需要注意的是上述的插件的方式直接进行assets中指定内容的打包,而在启动项目的时候，首先请求到服务器中的文件的时候服务器本身会
//先查看自身是否已经存在着对应文件的gz文件(也就是压缩文件)，如果有则响应给客户端同时带上固定的压缩方式提示的响应头