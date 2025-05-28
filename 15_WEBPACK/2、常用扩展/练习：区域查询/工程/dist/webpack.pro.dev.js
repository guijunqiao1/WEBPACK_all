"use strict";

//生产环境
var _require = require("clean-webpack-plugin"),
    CleanWebpackPlugin = _require.CleanWebpackPlugin;

module.exports = {
  mode: "production",
  devtool: "eval",
  plugins: [//注意此处的生产环境下配置上了plugin则在最终使用展开运算符进行对象内容合并的时候最终会出现多个plugins 
  //属性赋值并列的情况，即会进行覆盖而不是局部合并，故需要对重复配置的内容进行特殊处理完成局部属性的合并
  new CleanWebpackPlugin()]
};