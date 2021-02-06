import simFun from "./simFun.js";
// 全局配置
const config = {
  backgroundColor: "#FFF",
  menus: [
    { label: "全屏", value: 963280680, color: "#444", fontWeight: 900 },
    { label: "退出全屏", value: 707282658, color: "#444" },
    { label: "关于", value: 850674935, color: "#d00" },
  ],
  open() { return },//打开菜单成功回调函数
  //点击菜单回调函数
  click(value) {
    if (value == 963280680) {
      simFun.maxWindows()
    } else if (value == 707282658) {
      simFun.quitMax()
    } else if (value == 850674935) {
      simFun.inRegardTo()
    }
  },
  shut() { return },//关闭菜单回调函数
}

// 构造函数
function Rclick() {
  this.menusBox = null
}

Rclick.prototype.createMenusBox = function () {
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



Rclick.prototype.config = config; //配置默认参数

// 引入并注册显示菜的方法;
import showMenus from "./showMenus.js";
showMenus(Rclick)


/**为当前元素添加右键事件 */
Rclick.prototype.click = function (e, config) {
  if (!e || !e.target || isNaN(e.clientX) || isNaN(e.clientY)) { console.log("第一个参数必须是event"); return }
  e.stopPropagation();//停止冒泡
  e.preventDefault();//阻止默认事件
  this.showMenus(e, config)
  if (config && typeof config.open == "function") {
    config.open()
  } else {
    this.config.open()
  }
}
/** 关闭菜单 */
Rclick.prototype.shutMenus = function (config) {
  if (!document.querySelector(".win-right-click")) { return }
  document.body.removeChild(this.menusBox);
  // 触发回调函数
  if (config && typeof config.shut == "function") {
    config.shut()
  } else {
    this.config.shut()
  }
}
const $Rclick = new Rclick();

const install = (Vue) => {
  Vue.prototype.$Rclick = $Rclick;
}
export default install