import createElement from "../../js/createElement.js";
export default function (Win) {

  // 创建轻提示弹窗
  Win.prototype.msg = function (config) {
    // 获取appid
    let appid = this.getAppid(config);
    if (!appid) {
      return false
    }
    // 获取外层窗口ID
    let fatherId = config.fatherId ? config.fatherId : this.config.fatherId;
    let myWindows = this.myWindows(fatherId);
    if (!myWindows) { return }
    // 创建APP容器
    let msgBox = createElement("div", "win-msg", appid)
    if (fatherId) {
      msgBox.style.position = "absolute"
    }
    // 设置zindex 层级
    this.addZindex(msgBox);
    msgBox.innerText = config && config.msg ? config.msg : this.config.msg;

    myWindows.appendChild(msgBox)
    // 获取停留时间
    let msgTime = config && config.msgTime ? config.msgTime : this.config.msgTime;
    // 关闭窗口
    setTimeout(() => {
      // 判断该元素是否还存在于Html（如果手动触发了关闭事件则会提前删除）
      let msgBox = document.querySelector(`#${appid}`)
      if (msgBox) {
        myWindows.removeChild(msgBox);//删除该窗口元素
      }
    }, msgTime)
  }
  return Win;
}
