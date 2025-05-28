import style1 from "./assets/style1.css"
import style2 from "./assets/style2.css"

console.log("style1转换后的类名："+style1.toString());
console.log("style1："+style1);
console.log("style2转换后的类名："+style2.toString());
console.log("style2："+style2);

const div1 = document.getElementById("div1");
div1.className = style1.c1;