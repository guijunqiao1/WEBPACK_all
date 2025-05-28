//开发环境

module.exports = {
  mode:"development",
  devtool:"source-map",
  devServer:{
    open:true, //启动开发服务器后自动打开页面
    openPage:"list.html" //注意指的是输出的内容中的相对位置的指定打开的文件
  }
}
