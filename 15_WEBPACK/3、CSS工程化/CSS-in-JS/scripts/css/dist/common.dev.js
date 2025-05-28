"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.border = border;
exports.redBg = void 0;
var redBg = {
  backgroundColor: "red",
  color: "#fff"
};
exports.redBg = redBg;

function border() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#333";
  return {
    border: width + " solid " + color
  };
}