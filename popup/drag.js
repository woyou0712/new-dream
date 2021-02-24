/**
 * 拖拽方法,e:触发事件的元素,appBox:APP窗口元素, shade:遮罩层, myWindows:当前窗口所在的区域，fatherId：外层窗口ID
 *  */

export default function (e, appBox, shade, myWindows, fatherId) {
  e = e || window.event;  //兼容IE浏览器
  appBox.appendChild(shade);
  myWindows.onmousemove = function (event) {
    let windowX = event.clientX;
    let windowY = event.clientY;
    // 如果有父窗口，则子窗口相对父窗口定位移动，坐标要减去父窗口距离浏览器的距离
    if (fatherId) {
      let body = document.querySelector(`#${fatherId}`);
      windowX = windowX - parseInt(body.offsetLeft);
      windowY = windowY - parseInt(body.offsetTop) - 40;
      body = null
    }
    let left = windowX - e.offsetX;
    let top = windowY - e.offsetY;
    appBox.style.left = left + 'px';
    appBox.style.top = top + 'px';
  }
  myWindows.onmouseup = function () {
    this.onmousemove = null;
    this.onmouseup = null;
    appBox.removeChild(shade);
  }
}
