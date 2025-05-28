"use strict";

var _require = require("clean-webpack-plugin"),
    CleanWebpackPlguin = _require.CleanWebpackPlguin;

var WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  optimization: {
    //开启自动分包
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [new CleanWebpackPlguin(), new WebpackBundleAnalyzer({
    analyzerMode: "server"
  })]
};