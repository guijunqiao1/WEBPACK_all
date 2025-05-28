"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.pcss$/,
      use: ["style-loader", "css-loader", "postcss-loader"]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./public/index.html"
  })],
  devServer: {
    open: true
  }
}; // 需要注意.stylelintrc文件的作用为配置css的规范检查，其中extends配置具体控制检查的依赖，同时其中rules控制具体的规范规则，此处为控制缩进的距离为4个单位