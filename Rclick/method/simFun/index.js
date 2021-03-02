import $popup from "../../../popup";
import maxWindows from "./maxWindows"; // 全屏浏览器窗口
import quitMax from "./quitMax"; // 退出全屏

export default {
  // 窗口最大化
  maxWindows,
  // 退出最大化
  quitMax,
  // 关于
  inRegardTo() {
    $popup.alert({id: "rclick-in-regard-to", title: "关于", msg: "此UI组件由小妖个人开发，尚有不足请多指教！"});
  }
}
