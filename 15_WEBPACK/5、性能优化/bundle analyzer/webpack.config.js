const { CleanWebpackPlguin } = require("clean-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; 

module.exports = {
  mode:"production",
  optimization:{//开启自动分包
    splitChunks:{
      chunks:"all"    
    }
  },
  plugins:[
    new CleanWebpackPlguin(),
    new WebpackBundleAnalyzer({
      analyzerMode:"server"
    })
  ]
}