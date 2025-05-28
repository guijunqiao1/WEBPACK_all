"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_jquery["default"]); //此处演示如何具体控制模块解析：注意此处所描述的模块指的是chunk中走到的路径文件的整体而不是所谓的import以及require直接描述的模块，
//具体减少的方式为将文件内容中没有使用到require()或者import引入语句的文件跳过AST语法树分析、依赖记录、替换依赖引入关键字的编译流程
//一般来说依赖的尽头文件是需要使用noParse配置项控制的，毕竟是依赖的"尽头"