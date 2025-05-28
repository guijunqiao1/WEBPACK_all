module.exports = function(sourceCode){
  //需要注意的是下方的代码中直接操作document对象会在webpack打包编译的过程中报错，原因在于打包过程中的环境为node环境不存在页面的document文档对象
  //同时编译的过程中本质会调用这个函数，也就是执行这个函数中的内容
  // var style = document.createElement("style");
  // style.innerHTML = sourceCode;
  // document.head.appendChild(style);

  // 故需要放置在返回结果中作为加载器的code处理结果的返回
  return `
  var style = document.createElement("style");
  style.innerHTML = \`${sourceCode}\`;
  document.head.appendChild(style);
  module.exports = \`${sourceCode}\`
  `;
  // 解释：返回的结果的最后一行中的导出语句的作用在于为index.js这个模块提供导入的来源内容
}