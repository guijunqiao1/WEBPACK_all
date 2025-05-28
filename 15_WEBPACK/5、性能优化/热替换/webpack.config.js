const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  module:{
    rules:[
      {test:/\.css$/,use:["style-loader","css-loader"]}
    ]
  },
  devServer:{ 
    open:true,//自动打开页面
    hot:true //开启热替换，当代码发生变动时，浏览器仅请求发生变动部分的资源并且渲染（原先是请求所有的内容进行渲染,会刷新掉先前用户书写的信息）
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./public/index.html"
    }),
    //可选
    new webpack.HotModuleReplacementPlugin()//当开启了上述的hot配置之后改插件会自动引入，并且该内置插件为实际的完成热替换功能的主体
  ]
};

//此处还需要注意的是上述热替换针对的是js模块，如果是css模块的内容，则需要使用上style-loader，因为需要保证每次的更新使用的主项目中的style内容
//应当是每次进行热css代码替换的新的内容；若使用了mini-css-extract-plugin,由于它生成文件发生在构建期间，运行期间并不会改动文件，所以它对于热替换是无效的 