"use strict";

var TerserPlugin = require("terser-webpack-plugin");

var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  optimization: {
    //是否要启用压缩，默认情况下，生成环境会自动开启
    minimize: true,
    minimizer: [//压缩时使用的插件，可以有多个
    new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
  }
};