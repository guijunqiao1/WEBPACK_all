"use strict";//提示babel编译启用严格模式

const a= 1;


const b = (value)=>{
  console.log("b");
}

function Method(value){
  _this = this;
  var c = function c(){
    console.log(_this);
  }
}