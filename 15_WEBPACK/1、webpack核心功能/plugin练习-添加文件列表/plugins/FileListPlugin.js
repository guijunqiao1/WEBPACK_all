module.exports = class plugins{

  constructor(filename = "fileList.txt"){//类的构造函数，在当前类实例化的时候执行其中的内容--同时该构造函数中的参数由实例化的时候传递,同时此处设置默认值为"fileList.txt"
    this.filename = filename;
  }

  apply(compiler){//参数为编译器对象
    compiler.hooks.emit.tap("FileListPlugin",complation=>{
      console.log("complation:"+complation);//格式为:
      // complation:{
      //   assets:{
      //     main.js:{ content(){...},size(){...}   }
      //     main.map.js:{ content(){...},size(){...}   }
      //   }
      // }
      //定义文件列表数组，用于后续fileList文件内容的格式化的统一处理
      var fileList = [];
      for(key in complation.assets){//遍历得到的key为上述举例中的main.js等名称
        var content = `【${key}】
大小:${complation.assets.size()/1000}KB`;//fileList资源列表文件的内容动态拼接--需要注意其中的KB为1000BYTE，同时一个字符为一个BYTE
        fileList.push(content);
      }
      var str = fileList.join('\n\n');//数组调用join方法的含义在于每个元素之间使用参数进行拼接--需要注意普通字符和转移字符之间的区别
      complation.assets[this.filename] = {//注意当前调用filename属性的位置
        source(){
          return str;
        },
        size(){
          return str.length;
        }
      }
    })
  }
}
// 对上述的插件配置进行解析：
// 首先使用了在插件中调用了apply方法用于在初始化阶段完毕以及编译启动之前立即执行其中的内容：
// 首先使用了编译器对象，并且为编译器对象绑定上了编译相关的生命周期钩子(此处为输出资源列表(assets)之前的钩子emit，并且使用了tap关键字和
//dom操作中的addEventListener等价)，并且第一个参数表示事件的名称(一般使用的是插件自身的名称),第二个参数的回调用于处理需要完成的功能即
//添加输出的资源列表，同时此处使用了对象中添加新键值对的语法obj[new_Key]=new_Value的形式，而obj对应上complation编译管理集成信息对象中
//的assets对象(控制输出资源信息的对象),其中的键名表示资源的名称(也就是文件名,注意本质上asset资源在输出的时候就是一个文件，即bulde就是一个文件)
//同时赋值使用compiler对象绑定事件的标准写法完成content以及size函数的调用完成assets中的新的资源的添加(前者用于控制新资源的文本内容，后者控制分配的空间大小)
//打包编译过程中webpack会自动针对plugin的如上配置完成对应格式化事件内容的执行

module.exports =plugins;


//生成的fileList文件的本质其实仅起到原先的assetList的统计呈现作用，并不是将其中的内容进行整合