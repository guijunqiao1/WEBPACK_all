//需求分析：
const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.pro");


module.exports = function(env){
  console.log("env");
  console.dir(env);
   if(env && env.prod){
    console.log("成功进入");
    //生产环境
    const Config = {
      ...baseConfig,
      ...prodConfig
    }
    Config.plugins = [...baseConfig,...prodConfig];
    return Config;
   }  
   else{//开发环境
    return{
      ...baseConfig,
      ...devConfig
    }
   }
}

// 需要注意的是在开发环境下能够正常使用请求完成各个内容的交互的原因在于开发服务器提供代理解决跨域相关问题，故在打包后的文件中无法
//和在开发服务器上的请求访问的内容一致,需要将打包后的文件上传到服务器中才能正常完善其中的请求