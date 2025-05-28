
// 应用js代码为样式代码--不适用style-loader的情况下:
// var result1 = require("./assets/banner.css");
// var css = result1.toString();
// var style = document.createElement("style");
// style.innerHTML = css;//由于css变量本身还是字符串，故无需使用""进行包裹
// document.head.appendChild(style);


//使用了style-loader的情况下:
require("./assets/banner.css");
// 即可,因为自动生成了后续代码于“模块文件”中--注意loader的匹配对象以及修改对象为同一目标
//若在后续使用了多次的:
// require("./assets/banner.css");
// require("./assets/banner.css");
// require("./assets/banner.css");
// require("./assets/banner.css");
// require("./assets/banner.css");
// 导入语句由于编译阶段(loader工作于编译阶段)的模块记录的存在，则css-loader自身并不会对同一个模块引入style-loader同理