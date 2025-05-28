module.exports = {
  mode:"development",
  module:{
    rules:[
      {
        test:/\.css$/,//匹配上的正则表达式
        use:[
          {
            loader:"./loaders/style-loader"
          }//每个加载器都是一个对象
        ]//指定使用的加载器loader
      }
    ]
  }
}

