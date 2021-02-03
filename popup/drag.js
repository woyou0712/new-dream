/**
 * 拖拽方法,e:触发事件的元素,appBox:APP窗口元素, shade:遮罩层, myWindows:当前窗口所在的区域
 *  */
export default function (e, appBox, shade, myWindows) {
  e = e || window.event;  //兼容IE浏览器
  appBox.appendChild(shade);
  myWindows.onmousemove = function (event) {
    let left = event.clientX - e.offsetX;
    let top = event.clientY - e.offsetY;
    appBox.style.left = left + 'px';
    appBox.style.top = top + 'px';
  }
  myWindows.onmouseup = function () {
    this.onmousemove = null;
    this.onmouseup = null;
    appBox.removeChild(shade);
  }
}