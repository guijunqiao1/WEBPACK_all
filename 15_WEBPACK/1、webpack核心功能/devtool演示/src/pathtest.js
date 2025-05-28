//该对象提供了大量路径处理函数
const path =  require("path");//导出了一个对象

let result = path.resolve("./","src","abc","123");// C:\Users\86198\Desktop\15_WEBPACK\src\abc\123
result = path.resolve(__dirname,"src");// C:\Users\86198\Desktop\15_WEBPACK\src


console.log(result);

