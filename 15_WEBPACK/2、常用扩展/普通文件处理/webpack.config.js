// module.exports = {
//   mode:"development",
//   devtool:"source-map",
//   module:{
//     rules:{
//       test:/\.(png)|(jpg)|(eng)$/,//正则表达式，表示需要匹配上的资源文件,其中由于.为正则表达式中的特殊匹配符号，故需要使用\转移为普通匹配的字符"."
//       use:[{
//         loader:"file-loader",
//         options:{//此处use中存放的是匹配上的文件使用上的loader，并且其中具体的内容为loader的路径，在初始化webpack配置对象的时候webpack会自动
//           name:"imgs/[name][hash:5].[ext]"//需要注意此处的[name]和正常的webpack配置对象中的output配置中的[name]的区别在于：前者为rule匹配上的file的filename而后者为entry中的chunk的属性名一致的配置
//         }
//       }
//     ] 
//       //使用require()语句完成加载器的引入
//     }
//   }
// }

module.exports = {
  mode:"development",
  devtool:"source-map",
  module:{
    rules:{
      test:/\.(png)|(jpg)|(eng)$/,//正则表达式，表示需要匹配上的资源文件,其中由于.为正则表达式中的特殊匹配符号，故需要使用\转移为普通匹配的字符"."
      use:[{
        loader:"url-loader",
        options:{//此处use中存放的是匹配上的文件使用上的loader，并且其中具体的内容为loader的路径，在初始化webpack配置对象的时候webpack会自动
          // limit:false//表示不限制任何大小，凡是经过loader的文件，都进行base64编码返回
          limit:8143, //单位为字节，表示只要文件不超过8143字节，则使用base64编码，否则交给file-loader进行处理
          name:"imgs/[name][hash:5].[ext]"
        }
      }
    ] 
      //使用require()语句完成加载器的引入
    }
  }
}



// 对file-loader进行解析：
// 1、针对普通文件的处理一律使用：file-loader模块加载器(使用npm install file-loader完成模块的安装),又由于本身是node_module模块故在webpack配置
//文件中添加上的loader的路径应当为模块的名称，则在webpack帮助查找模块的时候从node_module中查找.

//2、此处的文件加载器的实现原理类似：
// module.exports = function file-loader(source){//其中source为目标指向文件资源内容,图片内容为buffer
  //1、生成一个具有相同文件内容的文件到输出目录
  //2、返回一段代码: export default "文件路径" 
// }

//3、注意该加载器和原先的img-loader处理的区别在于:
// 后者为初始化webpack配置对象的时候直接通过检查module中的加载器以及整个webpack打包过程中涉及到的文件并且匹配rules中的正则完成对应内容的直接替换后
//再在编译阶段完成chunks的打包，完成最终的output的文件生成，并且该文件中的assets列表中存在该替换后的伪js文件的对应内容；而前者则是直接
//通过统一的文件加载器完成统一操作，即额外生成输出文件到目标目录中，同时其中的内容和匹配上的source一致，而后将当前匹配上的内容置换为export default
// "文件路径",（本质实现原理为将内容转移到dist中同时将当前的引入模块文件作为中转器完成资源访问的目标转移）,同时在完成中转之后同样对该起到中转作用的js
//文件任然会由于入口完成一步一步的require进而使得当前的模块文件被打包到main.js中的某个asset中


// 对url-loader进行解析：
// 1、此处的文件加载器的实现原理类似：
// module.exports = function url-loader(source){
  //1、根据buffer生成一个base64编码(不局限于buffer)的文件内容,但是针对.png\.jpg\.eng的文件内容则都是buffer类型
  //2、返回一段代码: export default "base64编码"
// }



// 总结当前提到的两个加载器的作用:
// 1、file-loader：生成依赖的文件到输出目录，然后将模块文件设置为：导出一个路径。
// 2、url-loader：将依赖的文件转换为：导出一个base64格式的字符串。


// 前者获取到图片的方式为请求的方式，适合大图片；后者方式为编码的方式将图片资源进行保存，并且后续被访问的话直接解析其中的base64编码的、
//字符串即可完成图片的间接获取，适合小图片，因为存在关系：base64编码的字符串内容所占据的空间大小和小图片原先的空间大小等价，同时消耗
//的时间复杂度小于发送本地图片资源请求的方式的时间复杂度(同等资源体积同时偏向于小体积的情况下)