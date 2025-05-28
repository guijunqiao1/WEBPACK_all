var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  output:{
    filename:"[name][hash:5].js",
  },
  Plugin:[
    new CleanWebpackPlugin()
  ]
}

// 原理：当assets emit的时候,用fs模块清除dist内容