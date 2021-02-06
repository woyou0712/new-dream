import createElement from "../js/createElement.js";
export default function (Rclick) {
  Rclick.prototype.showMenus = function (e, config) {
    // 初始化菜单
    this.createMenusBox();
    // 如果没有传参，则使用默认参数
    if (!config) {
      config = this.config
    }
    if (!Array.isArray(config.menus) || !config.menus.length) {
      config.menus = this.config.menus
    }
    if (typeof config.click != "function") {
      config.click = this.config.click
    }
    // 清空菜单选项
    this.menusBox.innerHTML = "";
    // 根据配置文件生成菜单元素
    for (let item of config.menus) {
      let menus = createElement("div", "menus-item");
      menus.innerText = item.label ? item.label : item.value;//菜单名字
      menus.style.color = item.color ? item.color : "#444";//文字颜色
      // 字体重量
      if (item.fontWeight) {
        menus.style.fontWeight = item.fontWeight
      }
      // 为菜单添加点击事件
      menus.addEventListener("click", () => {
        let value = item.value ? item.value : item.label;
        // 关闭菜单
        this.shutMenus();
        // 触发事件
        config.click(value);
      })
      // 将菜单挂载到盒子上
      this.menusBox.appendChild(menus);
    }
    // 计算盒子的宽高
    let boxW = 150, boxH = config.menus.length * 25 + 8; // 8是盒子的上下内边距之和
    // 获取鼠标坐标
    let pageX = e.pageX, pageY = e.pageY;
    // 获取窗口宽度
    let pageW = window.innerWidth ? window.innerWidth : document.body && document.body.clientWidth ? document.body.clientWidth : 1200;
    // 获取窗口高度
    let pageH = window.innerHeight ? window.innerHeight : document.body && document.body.clientHeight ? document.body.clientHeight : 800;
    // 计算菜单显示位置
    let top = 0, left = 0;
    if (pageH - pageY <= boxH) {
      top = pageH - boxH - 8;//8是距离底部至少8px
    } else {
      top = pageY;
    }
    if (pageW - pageX <= boxW) {
      left = pageW - boxW - 8;//8是距离右侧至少8px
    } else {
      left = pageX;
    }

    // 为盒子添加坐标属性
    this.menusBox.style.top = top + "px";
    this.menusBox.style.left = left + "px";
    // 为盒子添加背景属性
    this.menusBox.style.backgroundColor = config.backgroundColor ? config.backgroundColor : this.config.backgroundColor;
    // 将菜单挂在到DOM树上
    document.body.appendChild(this.menusBox);


  }
}