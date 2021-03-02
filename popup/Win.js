import Vue from "vue"
import config from "./config";
/**
 * 创建构造函数
 * @param {Vue} Vue
 * */
export default function () {
  this.Vue = Vue;
  // 全局配置项
  this.config = config;
  this.windowsBox = null;
  this.shade = null;
}
