import drag from "../../method/drag.js";
import createElement from "../../../js/createElement.js";
import getTopLeft from "../../method/getTopLeft";
import shutSvg from "../../../svg/shutSvg.js";
/**
 * 初始化一个提示框
 * @param {Object} config
 * */
export default function (config) {
  // 获取appid
  let appid = this.getAppid(config);
  if (!appid) {
    return false
  }
  // 获取外层窗口ID
  let fatherId = config.fatherId ? config.fatherId : this.config.fatherId;
  let myWindows = this.createWindow(fatherId);
  if (!myWindows) { return }
  // 创建APP容器
  let appBox = createElement("div", "win-alert", appid)
  if (fatherId) {
    appBox.style.position = "absolute"
  }
  // 设置zindex 层级
  this.setZindex(appBox, config);
  let width = 350;
  let { left, top } = getTopLeft(width, 300, myWindows, fatherId)
  appBox.style["width"] = `${width}px`;
  appBox.style["left"] = left;
  appBox.style["top"] = top;
  // 点击置顶
  appBox.addEventListener("click", e => {
    e.stopPropagation();
    this.setZindex(appBox, config);
  })

  // 顶部标题栏
  config.theme = config.theme ? config.theme : this.config.theme;//主题类名
  //创建页头
  let title = createElement("div", ["alert-title", config.theme]);
  // 鼠标按下事件
  title.onmousedown = (e) => {
    // 停止冒泡
    e.stopPropagation();
    // 置顶 并且调用回调函数
    this.setZindex(appBox, config);
    // 移动拖拽(当前点击的元素，要移动的元素，遮罩层，移动元素所在区域)
    drag(e, appBox, this.shade, myWindows, fatherId)
  };
  // 左侧应用名称
  let name = createElement("div", "name");
  name.innerText = config.title ? config.title : this.config.title;//添加标题
  name.onmousedown = e => {
    e.stopPropagation();
    // 置顶 并且调用回调函数
    this.setZindex(appBox, config)
  }
  // 右侧按钮
  let btns = createElement("div", "btn-box");
  let shutBtn = createElement("span", "win-icon");//关闭按钮
  shutBtn.innerHTML = shutSvg;
  // 关闭窗口
  shutBtn.onclick = () => {
    var callback = typeof config.shut == "function" ? config.shut : this.config.shut;
    this.shutWin(appid, callback);
  }

  btns.appendChild(shutBtn)
  btns.onmousedown = e => {
    e.stopPropagation();
    // 置顶 并且调用回调函数
    this.setZindex(appBox, config);
  }
  title.appendChild(name)
  title.appendChild(btns)
  appBox.appendChild(title)
  // 内容区域
  let section = createElement("section", "alert-section");
  section.onmousedown = e => {
    e.stopPropagation();
    // 置顶 并且调用回调函数
    this.setZindex(appBox, config);
  }
  // 提示信息
  let info = createElement("p", "info-text")
  info.innerText = config.msg ? config.msg : this.config.msg;
  section.appendChild(info);


  return {
    myWindows,
    appBox,
    section,
  }
}
