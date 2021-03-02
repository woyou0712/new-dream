/**
 *
 *
 * */
export default function (config) {
  if (!document.querySelector(".win-right-click")) {
    return
  }
  document.body.removeChild(this.menusBox);
  // 触发回调函数
  if (config && typeof config == "function") {
    config()
  } else if (config && typeof config == "function" && typeof config.shut == "function") {
    config.shut()
  } else {
    this.config.shut()
  }
}
