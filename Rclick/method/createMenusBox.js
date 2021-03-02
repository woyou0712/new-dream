/**
 * 创建菜单盒子
 * */
export default function () {
  if (!this.menusBox) {
    this.menusBox = document.createElement("div");
    this.menusBox.classList.add("win-right-click");
    // 阻止右键默认事件
    this.menusBox.oncontextmenu = e => {
      e.stopPropagation();
      e.preventDefault();
    };
  }
}
