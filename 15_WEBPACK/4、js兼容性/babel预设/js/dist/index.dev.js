"use strict"; //提示babel编译启用严格模式

var a = 1;

var b = function b(value) {
  console.log("b");
};

function Method(value) {
  _this = this;

  var c = function c() {
    console.log(_this);
  };
}