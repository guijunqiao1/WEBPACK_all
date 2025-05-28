"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader", {
        loader: "css-loader",
        options: {// modules:true, //表示选择生成的模块化代码中的类名会被loader加载映射为哈希值--所有被css-loader处理的类名的hash值都不一样，除非同一个模块下的同类名的情况
          //生成的依据为：当前被处理(匹配上)的文件的路径 + 类名
          //同时生成之后，导出一个映射对象，方便开发者对原先的元素进行类名映射，具体的映射对象存在的位置于css-loader导出的对象中的
          //locals属性中
          //若在使用了css-loader的情况下同时还使用了style-loader，则在最终不仅完成style标签的内容填充和挂载同时导出的对象中的内容直接被优化为映射对象
          //此处进行具体的modules的配置--只有这样的格式才能配置上localIdentName,同时配置了这个说明已经满足了前者条件modules:true
          // modules:{
          //   localIdentName:"[name]-[hash:5]"//需要注意此处为自定义模块的hash类名的组合形式应当是什么样的--该配置给的是css-loader看的
          //   同时其中的[name]表示模块名(import或者require的时候引入的自定义名称)，[local]表示匹配上的模块中的类名
          // }
        }
      }]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./public/index.html"
  })],
  devServer: {
    open: true
  }
};