"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: true,
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.less$/,
      use: ["style-loader", "css-loader?modules", "less-loader"]
    } //需要注意不同的匹配标准中的loader无法共用
    //当前线程中在转化为css代码后将类名转化为hash
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./public/index.html"
  })],
  devServer: {
    open: true
  }
};