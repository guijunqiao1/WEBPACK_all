"use strict";

module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      use: ["babel-loader"] //需要提前安装babel-loader、@babel-core,前者为加载器本身，后者为加载之后的依赖的大体API提供的js库

    }]
  }
};