/**
 * 创建拖拽遮罩层、避免卡顿
 * */
export default function () {
  if (!this.shade) {
    // 创建遮罩层/避免鼠标拖入iframe窗口时出现卡顿现象
    this.shade = document.createElement("div");
    this.shade.classList.add("win-app-shade");
  }
  return this.shade;
}
