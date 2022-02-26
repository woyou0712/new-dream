/**
 * 创建、获取窗口容器
 * @param {String} fatherId 父窗口ID
 * */
export default function (fatherId) {
  // 如果存在fatherId，则获取父窗口的内容区域作为winBox
  if (fatherId) {
    // 最多只能套一层，禁止无限套娃
    let body = document.querySelector(`.win-windows-box > #${fatherId} > .win-section`)
    if (body) {
      return body
    }
    console.error("指定父窗口不存在 或者 父窗口不是根窗口")
    return false
  }
  // 如果未挂载到页面，则先挂载
  if (!this.windowsBox) {
    this.windowsBox = document.createElement("div");
    this.windowsBox.classList.add("win-windows-box");
    // 阻止右键默认事件
    this.windowsBox.oncontextmenu = e => {
      e.stopPropagation();
      // e.preventDefault();
    };
    document.body.appendChild(this.windowsBox);
  }
  this.createShade();
  return this.windowsBox;
}
