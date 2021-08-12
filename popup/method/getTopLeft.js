/**
 * 计算左右元素所在位置
 * @param {String} width 窗口宽度
 * @param {String} height 窗口高度
 * @param {Element} myWindows 盒子元素
 * @param {String} fatherId 父盒子ID
 * */
export default function (width, height, myWindows, fatherId) {
  // 获取窗口宽度
  let winWidth, winHeight;
  if (window.innerWidth)
    winWidth = window.innerWidth;
  else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
  // 获取窗口高度
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight;
  }
  let left = `${(winWidth - parseInt(width)) / 2}px`;
  let top = `${(winHeight - parseInt(height)) / 2}px`;
  if (fatherId) {
    left = `${(myWindows.offsetWidth - parseInt(width)) / 2}px`;
    top = `${(myWindows.offsetHeight - parseInt(height)) / 2}px`;
  }
  if (parseInt(left) < 0) {
    left = 0
  }
  if (parseInt(top) < 0) {
    top = 0
  }
  return {
    top, left
  }
}
