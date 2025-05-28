"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//需求分析：
var baseConfig = require("./webpack.base");

var devConfig = require("./webpack.dev");

var prodConfig = require("./webpack.pro");

module.exports = function (env) {
  console.log("env");
  console.dir(env);

  if (env && env.prod) {
    console.log("成功进入"); //生产环境

    var Config = _objectSpread({}, baseConfig, {}, prodConfig);

    Config.plugins = [].concat(_toConsumableArray(baseConfig), _toConsumableArray(prodConfig));
    return Config;
  } else {
    //开发环境
    return _objectSpread({}, baseConfig, {}, devConfig);
  }
}; // 需要注意的是在开发环境下能够正常使用请求完成各个内容的交互的原因在于开发服务器提供代理解决跨域相关问题，故在打包后的文件中无法
//和在开发服务器上的请求访问的内容一致,需要将打包后的文件上传到服务器中才能正常完善其中的请求