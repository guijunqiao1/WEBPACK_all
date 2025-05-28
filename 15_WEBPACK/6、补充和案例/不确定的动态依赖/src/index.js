// const module = document.getElementById("txt").value;

// if(Math.random()<0.5){
//   const a = require("./utils/"+module);//动态依赖--只有运行了代码才能确定依赖关系的依赖语句
//   console.log(a);
// }


// 上述的require("./utils/"语句的部分会被识别为uitls当前的文本的环境下的内容的生成,并且下方的转化语句仅在webpack运行过程中有效
// 参数1：目录，哪个目录中的模块需要添加到打包结果
require.context("./utils");