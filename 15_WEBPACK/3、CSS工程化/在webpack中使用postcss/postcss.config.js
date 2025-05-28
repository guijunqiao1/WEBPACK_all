module.exports = {
  map:false,//关闭source-map
  plugins:{//plugins配置项在哪个配置文件中都可以使用对象或者数组的写法
    "postcss-preset-env":{//该插件允许配置未来的css语法的插件
      stage:0,//哪怕是处理草案阶段的语法，也需要转换
      preserve:false
    },
    // "postcss-apply":{},//该插件允许使用属性集的语法
    // "postcss-color-function":{}//该插件允许使用颜色相关的函数
  }
}