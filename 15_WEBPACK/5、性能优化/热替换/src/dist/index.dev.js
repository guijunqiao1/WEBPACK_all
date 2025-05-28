"use strict";

var _a = _interopRequireDefault(require("./a"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_a["default"]);

if (module.hot) {
  //是否开启了热更新
  module.hot.accept(); //接收了热更新
} // 上述的module即使在当前文件中没有引入以及出现，但是不会报错，因为当前文件最终是先被打包后被运行的，打包后自身作为assets被外部的立即执行函数
//包裹，同时其中传参为module、exports、__webpack_require__，则恰好能够与此处的module进行配合处理，同时配置了hot为true之后hotModuleReplacePlugin
//插件会在webpack打包过程中将module实参添加上hot属性，同时为该属性添加上了accept方法，调用之后会将原先的服务端通知浏览器端直接调用loaction.reload
//的方式替换为将修改后的内容(main.js的类似的assets内容，其中有具体哪个地方更改的标识)提交给浏览器，同时浏览器结合原先的代码内容进行重新运行,虽然是重新运行
//但是并不会像location.loaded方法直接调用一样将全部内容进行刷新--上述服务器之所以能够主动向浏览器发送内容原因在于webpack-dev-server的网络协议为web socket
//永远连接双方，故可双向通信，而http则不行(只能客户端向服务端发送)
// 需要区分热替换和热更新之间的区别：后者为更新后立即重新请求完成刷新的效果，而前者为在后者的基础上优化为仅对发生变动的部分完成重新请求进行
//最新的内容的替换