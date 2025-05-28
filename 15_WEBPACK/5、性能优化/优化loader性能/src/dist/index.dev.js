"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var obj = {
  0: "a",
  1: "b"
};

var result = _lodash["default"].isArray(obj); //判断是否为真数组而不是上述的伪数组