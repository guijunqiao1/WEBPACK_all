"use strict";

/* global var1,var2:writable */

/* eslint eqeqeq:"error" */
//上述第一行为告诉eslint中新增全局变量的语法,进行在当前作用域下有效的全局变量
//上述第二行为告诉eslint针对当前的文件中若使用了三个连续等号则程序运行时报错同时发出警告
console.log(var1);
console.log(var2);
var2 = 3;