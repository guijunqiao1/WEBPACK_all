var c = Math.random();

//当前文件内容被引入由于无法判断内容是否产生副作用故tree shaking无法将引入的内容全部清除,保留下来了Math.random()函数的调用