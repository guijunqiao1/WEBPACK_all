import _ from "lodash";

$(".red").click(async function(){
  const { chunk } = await import("./util");
  console.log(_.chunk([1,2,3,4],2));
})