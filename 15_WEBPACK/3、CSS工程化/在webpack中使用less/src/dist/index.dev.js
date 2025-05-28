"use strict";

var _index = _interopRequireDefault(require("./assets/index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log("styles" + _index["default"]); // import "./assets/a.css";
//即使使用.less作为后缀，webpack任然理解为js模块化代码进行处理,而其它运行器则按照之前的规则进行处理(导入内容的后缀直接决定类型，若没后缀同时没路径，则在node_modules中找，
//否则为指定路径下的js文件)
//导入依赖的less模块，需要注意提前使用loader转化为js模块化的代码
// 经过了style-loader处理之后将"类样式"添加到了全局的style中之后，同时将映射类名对象导出，此时如果需要进行元素样式应用则：

var app = document.getElementById("app");
app.className = _index["default"].app; //自动映射后的类名