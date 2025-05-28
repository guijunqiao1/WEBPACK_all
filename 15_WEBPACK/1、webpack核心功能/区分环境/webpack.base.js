module.exports = {
  entry: {
    main:"./src/index.js",
  },
  output: {
    filename:"script/[name].[chunkhash:5].js",
  }
}


// 公共配置,之所以存在公共配置这个概念是因为本质导出的内容为对象，并且对象之间可以合并(展开运算符的特殊使用)