import initWindow from "./initWindow";
import createHtml from "./createHtml";
import createVue from "./createVue";

export default function (Win) {

  // 初始化一个应用弹窗(iframe或者VUE组件)
  Win.prototype.__initWindow = initWindow;

  // 创建一个iframe弹窗
  Win.prototype.html = createHtml;

  // 创建一个VUE组件弹窗
  Win.prototype.vue = createVue

  return Win;
}
