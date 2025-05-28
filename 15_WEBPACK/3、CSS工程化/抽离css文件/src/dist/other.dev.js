"use strict";

var _b = _interopRequireDefault(require("./assets/b.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 若需要为单独标签进行类名添加，style-loader只能实现添加上总的style标签到引入当前js文件的模板中，故需要手动实现
var div = document.createElement("div");
div.className = _b["default"].main;