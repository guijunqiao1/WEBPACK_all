class plugins{
  //apply函数会在初始化阶段会在创建好compiler对象后运行
  apply(compiler){//参数为编译器对象
    //在这里注册事件，类似window.onload $(function(){})
    compiler.hooks.before.tap("Myplugin-done",function(compilation){
      //事件处理函数
      console.log("编译完成");
    })
  }
}


module.exports =plugins;