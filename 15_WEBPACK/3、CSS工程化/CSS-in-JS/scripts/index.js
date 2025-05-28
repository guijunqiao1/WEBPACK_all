
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
import { applyStyles } from "./css/util";
import { redBg } from "./css/common";
import { border } from "./css/common";

const style = {
  width:"400px",
  height:"500px",
  margin:"0 auto"
}
//为元素添加样式
applyStyles(div1,style,border(),redBg);
applyStyles(div2,style,border(5,"green"),redBg);