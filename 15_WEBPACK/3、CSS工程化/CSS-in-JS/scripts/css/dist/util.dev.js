"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStyles = applyStyles;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 给某个dom应用某个样式
 * @param {*} dom dom元素
 * @param {*} styles 样式对象
 */
//应用样式方法
function applyStyles(dom) {
  //处理styles中剩余的参数完成总的样式添加--第一个样式参数为公共样式，后续为典例参数
  var targetStyles = {};

  for (var _len = arguments.length, styles = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styles[_key - 1] = arguments[_key];
  }

  for (var style in styles) {
    targetStyles = _objectSpread({}, targetStyles, {}, style);
  }

  for (var key in targetStyles) {
    //遍历对象的方式，其中key为属性名
    var value = targetStyles[key]; //索引得到属性值  

    dom.style[key] = value; //向对象中添加新的键值对的方法
  }
}