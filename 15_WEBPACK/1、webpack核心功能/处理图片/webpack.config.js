module.exports = {
  mode:"development",
  devtool:"source-map",
  module:{
    rules:[
      {
        test:/\.(png)|(jpg)|gif$/,//匹配上的正则表达式
        use:[
          {
            loader:"./loaders/img-loader"
          }//每个加载器都是一个对象
        ]//指定使用的加载器loader
      }
    ]
  }
}

