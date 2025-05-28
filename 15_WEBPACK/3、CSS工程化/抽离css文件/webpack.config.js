const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode:"development",
  devtool:"source-map",
  entry:{
    main:"./src/index.js",
    other:"./src/other.js"//此处两个chunks入口导致生成了对应的数量的css-laoder--前提是需要看每个chunk中引入的css是否被下方loader处理过
  },
  output:{//需要此处配置的是输出的chunks附属的js文件的配置
    filename:"js/[name].[chunkhash:5].js",
    publicPath:"/" //注意：在output配置上了的publicPath是全局的配置
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,"css-loader?modules"]//其中配置css-loader中的module为true表示的是将生成的模块化“类名”按照hash进行映射
        //同时使用了Mini库中的loader，其值为路径指向，指向了该库中的loader的存放的位置,同时该loader起到记录css-loader生成内容的作用，同时起到和style-loader进行后续
        //处理的类似(只是类似，因为并没有发生js内容的直接添加到style标签的操作)的处理，即将css-loader处理后的类名进行直接映射对象的导出而不包含style样式块的内容
      },
      {
        test:/\.png$/,
        use:{
          loader:"file-loader",
          options:{
            name:"img/[hash:5].[ext]"
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./public/index.html",
      // chunks:["main"]//控制模板html中自动引入哪些的chunks中的衍生文件(例如经过loader处理的css文件、和经过webpack编译的js文件)
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({//负责生成css文件同时放置记录css-style生成的总的内容到其中
      //此处配置生成的css文件的位置以及名称
      filename:"css/[name].[contenthash:5].css" //使用了间接相对路径，和dist目录进行拼接了
    })
  ],
  devServer:{
    open:true
  }
}


// 希望将style-loader处理得到的style样式块(例如：hash类名对应的样式内容)内容并且聚集为一个css文件，则使用本节专属的库(依赖):min-css-extract-plugin
//将该库中的loader直接替换掉style-loader的功能,而该库中的loader的作用仅用于记录css-loader中生成的内容，只有该库的插件的本体才能起到生成css文件的作用，同时记录的内容直接添加到css中（默认为main.css文件）
//同时生成的css文件的依据在于chunks

//同时经过处理之后在最终生成的模板html中同样会自动引入对应chunks生成的css文件的内容，需要注意和对应上chunks生成的js同样会被引入到生成的模板文件中，由HtmlWebpackPlugin插件来完成
//因为HtmlWebpackPlugin插件默认情况下会将所有的chunks资源打包到当前实例中的模板html文件中,此时若在HtmlWebpackplugin对象中配置了chunks的配置，则能够指定上引入的对应上了chunks的css、js资源的对数




// 拓展：
// 1、[hash]：
// 定义：[hash] 是基于整个构建过程生成的哈希值。
// 特点：在一次 Webpack 构建中，所有输出文件（无论是否更改）都会共享相同的 [hash] 值。也就是说，只要构建过程有任何变化（例如代码、配置或依赖更新），所有文件的 [hash] 都会改变。
// 适用场景：适合需要所有输出文件在每次构建时保持一致哈希的场景，但不利于长期缓存，因为即使某些文件内容未变，哈希也会更新。
// 2、[contenthash]：
// 定义：[contenthash] 是基于具体文件内容的哈希值，通常用于提取的 CSS 文件或通过特定插件（如 MiniCssExtractPlugin）生成的文件。
// 特点：每个文件的 [contenthash] 只根据该文件的内容生成。如果文件内容未变，其 [contenthash] 保持不变，即使其他文件或构建过程发生了变化。这非常适合长期缓存策略。
// 适用场景：适合需要优化浏览器缓存的场景，例如单独提取的 CSS 或 JS 文件，只有内容变化时才会触发客户端重新加载。