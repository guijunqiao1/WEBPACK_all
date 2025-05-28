module.exports = {
  mode:"development",
  devtool:"source-map",
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/lodash/,//此处使用Loader的配置项中的exclude表示的是排除某个具体的模块进行下方的loader的使用，而babel-loader的
        //作用本身在于将新版的js代码转化为旧版的js代码，而lodash库中的依赖.js文件本身的内容本身其实就是旧版的js代码,故无需进行
        //babel-loader的处理(不会检查其中的内容进而浪费时间)，故完成优化性能
        //同时注意此处的正则匹配的是文件(夹)名
        // 一般的公司直接暴力将/node_modules/进行排除，因为一般依赖都是老版本的js代码编写的
        // 也可以使用include完成唯一的范围的固定
        // 需要注意的是排除的是loader，和noParse的配置并不冲突
        // use:["cache-loader","babel-loader"]//需要注意此处同时还使用了cache-loader完成先前相同文件的loader的处理的缓存,
        // 需要注意的是，该loader起作用的时机是缓存的目标文件中并没有发生修改，同时第一次的处理时间比不使用cache-loader都要多，因为需要将
        //缓存的内容放置在该loader模块中的某个文件中，读写文件的时间也要算上
        // 需要注意的是使用cache-loader的逻辑位置应当是最后的,故放在第一位，否则无法起到相同文件未发生改变而使用缓存的功能
        //若使用下方配置写法则可控制生成的缓存文件的位置
        use:[{
          loader:"cache-loader",
          options:{
            cacheDirectory:"./cache"
          }
        },
        "thead-loader",//此处还使用了thead-loader用于处理多个匹配上的文件的情况下，开启多线程完成loader的解析的过程，
        //但是需要注意的是loader的放置的相对的位置，由于cache-loader本身的缓存的内容是并列存在的，那么其实不放在新的线程中其实
        //效率还会更好,弥补了webpack在各种环境下运行js代码都是单线程的缺点
        // 同时需要注意的是使用了当前的thead-loader之后放置在线程中的loader应当遵循：(即满足隔离效应，具体情况下可以插空排放，若不行那么打包会报错)
        // 1、不能使用webpack API 生成文件
        // 2、无法使用自定义的plugin API
        // 3、无法访问webpack options
        "babel-loader"
        ]
      }
    ]
  }
}


//对loader工作流程进行重新的叙述：
// 首先要知道的是所有的loader的源码的本质还存在着pitch属性的赋值，类似为：
// function loader(source){
//   return `new source`;
// }
// loader.pitch = function(filePath){
//   //可返回可不返回
//   // 如果返回，返回源代码，具体实现利用的是若存在缓存的标记，则利用filePath属性完成缓存文件的读写并且返回
// }
// module.exports = loader;


// 那么在webpack配置对象中配置上的loader若最后一位存在着cache-loader，那么在第一次的经过每一个loader处理之前都需要调用并观察该loader的
//pitch属性是否成功返回了源代码内容，同时该属性存放对应缓存标记的时刻是当经过了一次cache-loader的时候才会将先前的Loader中的pitch属性进行阶段
//标记，同时在每一次的loader处理之前若存在着缓存标记则读写文件内容完成资源返回同时直接跳过后续的loader的pitch属性检查以及loader的执行直接开始处理资源
//并提交给AST语法树完成后续编译流程，需要注意的是若在缓存了一次cache-loader先前的Loader的内容之后，若目标文件发生了修改，则将对应的处理loader的pitch针对该
//文件的标记置为空并且其中的pitch属性被调用也返回为了空，需要重新执行loader以及cache-loader完成缓存