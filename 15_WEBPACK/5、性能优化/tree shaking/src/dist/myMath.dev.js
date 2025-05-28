"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.sub = sub;
exports.myChunk = myChunk;

var _lodashEs = require("lodash-es");

function add(a, b) {
  console.log("add");
  return a + b;
}

function sub(a, b) {
  console.log("sub");
  return a - b;
}

function myChunk(arr, num) {
  console.log("myChunk");
  return (0, _lodashEs.chunk)(arr, num);
} // export default {
//   add:function add(a,b){
//     console.log("add");
//     return a+b;
//   },
//   sub:function sub(a,b){
//     console.log("sub");
//     return a-b;
//   }
// }