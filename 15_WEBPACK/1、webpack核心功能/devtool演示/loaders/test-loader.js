//加载器内容模拟

//注意下方replace为字符串内置的方法，返回值为替代后的被修改的整体字符串

module.exports = function(sourceCode){
  return sourceCode.replace(/变量/g,"var");
}