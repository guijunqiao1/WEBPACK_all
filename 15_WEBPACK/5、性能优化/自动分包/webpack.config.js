const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MinCssExtractPlugin = require("min-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports=  {
  mode:"production",//需要注意的是一般分包用于生产环境，因为开发环境的传输性能已经可以被热替换优化完毕了
  entry:{
    page1:"./src/page1",
    page2:"./src/page2"
  },
  module:{
    rules:[
      {
        test:/\.css$/,use:[MinCssExtractPlugin.loader,"css-loader"]
      }
    ]
  },
  output:{
    filename:"[name].[hash:5].js"
  },
  Optimization:{
    splitChunks:{
      //分包策略
      chunks:all, //针对所有的chunk都要应用分包策略，默认值为async表示的是仅针对异步chunk应用分包策略--webpack的懒加载中提到异步chunk
      maxSize:60000, //控制分出来的"公共"chunk的最大字节数,若超过则对该公共chunk进行分包
      automaticNameDelimiter:".", //当前配置控制的是终端控制台打印出来的资源列表中公共分包的资源名称中的分隔符
      minChunk:2, //控制的是最小的chunk的引用数，当多少个"chunk"引用公共模块的时候将公共模块分出一个chunk包出来,默认值为1
      minSize:30000,  //当进入了minChunk的分包前提的模块满足当前minSize的配置要求的时候才进行实际的分包--也就是minChunk为公共模块分包的首要条件，而当前minSize为次要条件
      // 该配置项的默认值为30000byte
      // 若配置了当前minSize为0，则在分包的结果中是4个chunks对应的bundle，因为page1.js、page2.js对应两个chunk，而commonjs为page1和page2的公共自定义模块的资源则作为一个chunk存在，
      //而对于jquery和lodash，虽然同样作为公共代码存在，但是并不是自定义模块，而是属于node_modules中的模块，故需要和自定义模块区分分包故放置在了另外的chunks中
      // 需要注意和maxSize之间的区别：前者为达到多少进行当前公共模块从独立模块中分离出来，后者为达到多少将自身公共chunk分离成多个chunks

      // cacheGroups:{//此处表示的是配置缓存组
      //   //属性名是缓存组的名称，会影响到分包的chunk名
      //   //属性值是缓存组的配置，缓存组继承所有的全局配置，也有自己特殊的配置
      //   vendors:{//js公共模块配置--默认配置上了
      //     test:/[\\/]node_modules[\\/]/,//当匹配到相应模块时，将这些模块
      //     priority:-10 //缓存组优先级，优先级越高，该策略越先进行处理，默认
      //   },
      //   //默认配置，需要注意的是该配置的位置
      //   default:{
      //     minChunks:2,//覆盖全局配置，将最小的chunk引用数改为2
      //     priority:-20,//优先级
      //     reuseExistingChunk:true //重用已经被分离出去的chunk
      //   }
      // },

      cacheGroups:{//此处表示的是配置缓存组
        styles:{//css公共模块配置
          //此处控制了css公共(所谓公共表示至少两个chunk同时使用)模块直接分离出来
          minSize:0,
          test:/\.css$/,
          minChunks:2
          //需要注意的是没有显式配置priority则默认值为0
        }
      }
    }
  },
  plugins:[
    new CleanWebpackPlugin(),
    new MinCssExtractPlugin({
      //该插件使得每个该插件的loader匹配上的css文件作为单独的chunk存在，同时下方规定生成的bundle的文件名
      filename:"[name].[hash].css",
      //下方配置的是公共CSS的chunk(由cacheGroups配置中的styles配置控制生成)所对应生成的bundle的文件名
      chunckfilename:"common.[hash:5].css"
    }),
    new HtmlWebpackPlguin({
      template:"./public/index.html",
      chunks:["page1"] //此配置表示的是当前html打包插件实例中自动script标签使用src属性引入的内容是从chunks
      //中配置上的chunk本身的入口的文件资源对应的target目录下的bundle中的文件以及该入口文件引入的文件，而对于
      //引入的文件若存在公共chunk的bundle，则同样在target目录下寻找直接依赖对应上分包后的bundle文件完成公共模块的引入
      //以及其它依赖对应上target目录下的对应文件模块的引入
    })
  ],
  stats:{//控制终端控制台输出内容的配置项
    colors:true, //控制不同维度的内容的颜色区分
    chunks:false, //控制资源清单中的chunks的信息不显示
    modules:false //控制资源清单中的chunks中的各个模块的信息不显示
  }
  
}


// 一定要注意一个概念：被分包出来的内容一定是公共模块部分