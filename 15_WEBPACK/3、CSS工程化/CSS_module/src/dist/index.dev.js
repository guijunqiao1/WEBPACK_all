"use strict";

var _style = _interopRequireDefault(require("./assets/style1.css"));

var _style2 = _interopRequireDefault(require("./assets/style2.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log("style1转换后的类名：" + _style["default"].toString());
console.log("style1：" + _style["default"]);
console.log("style2转换后的类名：" + _style2["default"].toString());
console.log("style2：" + _style2["default"]);
var div1 = document.getElementById("div1");
div1.className = _style["default"].c1;