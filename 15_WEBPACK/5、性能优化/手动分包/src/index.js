import $ from "jquery"; //经过webpack的模块分析的时候会将此处的模块的导入解析为对应的模块id，此处为：node_modules/jquery/dist/juqery.js
import _ from "lodash"; 
 
const result = _.isArray($(".red"));
console.log(result);
