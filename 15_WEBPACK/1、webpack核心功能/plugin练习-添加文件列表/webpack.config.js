var FileListPlugin = require("./plugins/FileListPlugin.js");

module.exports = {
  mode:"development",
  devtool:"source-map",
  plugins:[
    new FileListPlugin("FILELISR.txt"),//此处主动传递插件类中构造函数的参数用于指定合成(新建)的asset资源文件的名称
  ]
}



