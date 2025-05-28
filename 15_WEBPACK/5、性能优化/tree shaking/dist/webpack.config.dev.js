"use strict";

var _require = require("clean-webpack-plugin"),
    CleanWebpackPlugin = _require.CleanWebpackPlugin;

var DeepScope = require("webpack-deep-scope-plugin");

var MiniCss = require("mini-css-extract-plugin");

var Purgecss = require("purgecss-webpack-plugin");

var path = require("path");

var globAll = require("goob-All");

var srcAbs = path.resolve(__dirname, "src"); //得到src的绝对路径

var htmlPath = path.resolve(__dirname, "public/index.html");
var paths = globAll.sync(["".concat(srcAbs, "**/*.js"), //该方法的语法用于直接匹配上所有满足条件的js文件
htmlPath //单独处理路径问题,上方的匹配中的/能够自动匹配上__dirname的\而此处直接书写路径无法匹配，故需要针对当前的路径进行path的方法调用
]);
console.log(paths);
module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCss.loader, "css-loader"]
    }]
  },
  plugins: [new CleanWebpackPlugin(), new DeepScope(), //简单的深度作用域下是否使用模块内容的分析,协助tree shaking
  new MiniCss(), new Purgecss({
    paths: paths //等价paths:paths，此处的路径内容中即包含html文件也包含html文件的原因在于需要结合整体的dom对象中的dom以及CSSOM树进行
    //合理分析并且完成css的tree shaking

  })]
};