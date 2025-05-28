"use strict";

var _util = require("./css/util");

var _common = require("./css/common");

var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");
var style = {
  width: "400px",
  height: "500px",
  margin: "0 auto"
}; //为元素添加样式

(0, _util.applyStyles)(div1, style, (0, _common.border)(), _common.redBg);
(0, _util.applyStyles)(div2, style, (0, _common.border)(5, "green"), _common.redBg);