import initAlert from "./initAlert";
import createAlert from "./createAlert";
import createPrompt from "./createPrompt";

export default function (Win) {
  // 初始化一个应用弹窗(iframe或者VUE组件)
  Win.prototype.__initAlert = initAlert

  // 弹窗alert提示框
  Win.prototype.alert = createAlert;

  // 弹窗输入框
  Win.prototype.prompt = createPrompt;

  return Win;
}
