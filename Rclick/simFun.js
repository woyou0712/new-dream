import createElement from "../js/createElement.js";
// 判断浏览器内核
function getBrowser() {
  var ua = navigator.userAgent.toLowerCase(),
    name = "";
  ua.match(/firefox\/([\d.]+)/)
    ? (name = "firefox")
    : ua.match(/chrome\/([\d.]+)/)
      ? (name = "chrome")
      : ua.match(/opera.([\d.]+)/)
        ? (name = "opera")
        : ua.match(/version\/([\d.]+).*safari/)
          ? (name = "safari")
          : (name = "ie");
  return name;
}



export default {
  // 窗口最大化
  maxWindows() {
    if (getBrowser() == "ie") {
      alert("当前浏览器不支持该功能,请尝试手动按F11");
      return;
    }
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    }
  },
  // 退出最大化
  quitMax() {
    if (
      !!document.fullscreenElement ||
      !!document.mozFullScreenElement ||
      !!document.webkitFullscreenElement
    ) {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  },
  // 关于
  inRegardTo() {
    var isBox = document.querySelector(".in-regard-to-win");
    if (isBox) { return }
    let box = createElement("div", "in-regard-to-win");
    // 阻止右键默认事件
    box.oncontextmenu = e => {
      e.stopPropagation();
      e.preventDefault();
    };
    //创建页头
    let title = createElement("div", "regard-title");
    let name = createElement("span", "name");    // 窗口名称
    name.innerText = "关于！";
    let msg = createElement("span", "msg");
    msg.innerText = "该窗口无法拖动，请手动关闭";
    let shutBtn = createElement("span", ["iconfont", "shut"]);//关闭按钮
    shutBtn.innerHTML = "&#xe659;";
    // 关闭窗口
    shutBtn.onclick = () => {
      document.body.removeChild(box);
    }
    title.appendChild(name);
    title.appendChild(msg);
    title.appendChild(shutBtn);
    box.appendChild(title);
    let section = createElement("section", "regard-section");
    section.innerHTML = `<p> 此UI组件由小妖个人开发，尚有不足请多指教！</p><a href="https://jq.qq.com/?_wv=1027&k=A6uckLvp" target="_blank" class="qq"> QQ交流群：666713758 </a>`
    box.appendChild(section)

    document.body.appendChild(box);//将box挂在到dom树上
  }
}