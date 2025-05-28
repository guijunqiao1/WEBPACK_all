"use strict";

var _index = _interopRequireDefault(require("./assets/index.pcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_index["default"]); //输出结果为类名映射对象--被style-loader直接截取了其中的样式内容,用于直接的类名赋予className属性方法赋予