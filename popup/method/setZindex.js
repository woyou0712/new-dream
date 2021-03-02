/**
 * 设置窗口z-index层
 * @param {Element} element 当前窗口
 * @param {Object} config 配置文件
 * */
export default function (element, config) {
  // 如果已经是最顶层，则停止置顶
  if (element.style["z-index"] == this.zIndex) {
    return;
  }
  this.zIndex += 1;
  element.style["z-index"] = this.zIndex;
  if (!config) {
    return
  }
  if (typeof config.top == "function") {
    config.top(element.id);
  } else {
    this.config.top(element.id);
  }
}
