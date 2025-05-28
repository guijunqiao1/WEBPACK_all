"use strict";

module.exports = {
  mode: "development",
  devtool: "source-map",
  // watch:true,
  module: {
    rules: [{
      text: /\.css$/,
      //正则表达式匹配上以.css结尾的文件
      use: ["style-loader", "css-loader"] //在webpack对象初始化的时候自动化将值的内容放置在require中进行loader的引用  

    }, {
      text: /\.(png)|(jpg)|(eng)$/,
      //匹配上图片资源
      use: [{
        loader: "./loaders/file-loader.js"
      }]
    }]
  }
}; // 补充：
// css-loader的作用在于将css代码转化为js代码，例如:
// .red{
//   color:red;
// }
// ==>
// module.exports = `
// .red{ 
//   color:red;
// }
// `--简化后的内容，本质导出的是数组，只不过提供了toString方法使得导出的内容类似和简化后的代码类似
// 使用了css-loader处理后又使用style-loader进行处理的结果为(style-loader的使用必须在使用了css-loader进行处理的情况下才能正常工作)：
// .red{
//   color:red;
// }
// ==>
// module.exports = `
// .red{ 
//   color:red;
// }`