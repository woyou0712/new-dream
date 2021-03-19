import Vue from "vue"
import config from "./config";
/**
 * 创建构造函数和基础公共属性
 * */
 function Win() {}
 Win.prototype.config = config;
 Win.prototype.Vue = Vue;
 Win.prototype.windowsBox = null;
 Win.prototype.shade = null;
 export default Win