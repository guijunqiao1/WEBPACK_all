"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var btn = document.querySelector("button");

btn.onclick = function _callee(e) {
  var _ref, chunk, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require("./utils"));
          }));

        case 2:
          _ref = _context.sent;
          chunk = _ref.chunk;
          //对于utils介质依赖文件中的import {chunk} from "lodash-es"而言属于静态引入依赖的方式故tree shaking会对依赖内容进行处理,完成内容的筛选的效果
          result = chunk([3, 5, 6, 7, 87], 2);
          console.log(result);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // 此类懒加载js代码的方式需要注意的是，在经过了webpack打包之后是存在着所有的依赖文件的内容的，但是在实际启动项目的时候实际使用上的文件内容是不包含着
//条件加载的js文件的,当触发条件之后进行js文件的加载的时候,需要注意使用的是目标目录中的assets清单中导向的js文件的内容,也就是使用了webpack生产环境下
//打包过程中的tree shaking过后的内容的,在触发之前生产环境下的assets文件中的全局变量webpack Jsonp中是没有该模块的信息的，但是触发之后则在webpack Jsonp全局变量中
//是存在着该模块的内容信息的