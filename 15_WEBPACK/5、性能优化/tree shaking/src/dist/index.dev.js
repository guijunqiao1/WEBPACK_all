"use strict";

var _myMath = require("./myMath");

require("./common");

require("./index.css");

var div = document.createElement("div");
div.innerText = "myDiv";
div.className = "red";
document.body.appendChild(div);
console.log((0, _myMath.add)(1, 2));