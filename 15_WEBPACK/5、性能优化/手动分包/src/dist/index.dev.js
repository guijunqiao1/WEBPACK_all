"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//经过webpack的模块分析的时候会将此处的模块的导入解析为对应的模块id，此处为：node_modules/jquery/dist/juqery.js
var result = _lodash["default"].isArray((0, _jquery["default"])(".red"));

console.log(result);