console.log("123");
console.log("abc");

// 需要注意的是webpack-dev-server本质为webpack官方提供的npm包,既不是plugin也不是loader

// 需要注意的是webpack_dev_server启动的服务为开发者调试的内容模拟webpack中的dist目录下的环境的原理在于：
// 模拟的本质为webpage配置对象以及结合上该对象中的具体的配置内容和src目录下的内容完成dist目录下的环境的模拟而不生成实际的dist文件中的打包内容

 

//开发服务器中具体做的事情有：
// 1、内部执行webpack命令，传递命令参数
// 2、开启watch 
// 3、注册hoos：类似于plugin,webpack-dev-server会向webpack中注册一些钩子函数，主要功能如下：
// （1）将资源列表保存(缓存)起来
// （2）禁止webpack输出文件
// 具体的代码实现层面的举例：
// var assets = compilation.assets;
// compilation.assets = {};
// 4、用express开启一个服务器，监听某个端口，当请求到达后，根据请求的路径，给予相应的资源内容
// 具体的实现层面的举例：
// 启动的开发服务的url为:http://localhost:8080，并且当访问main页面的时候则使用http://localhost:8080/main.js请求的时候
//服务器代理自动将assets缓存变量中的内容中键名匹配路径的资源内容提交给浏览器并且执行渲染,后续使用script标签中的src属性请求得到的
//内容同理是利用http://localhost:8080/资源路径请求的方式完成资源的获取以及执行的