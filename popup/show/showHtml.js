import drag from "../drag.js";
import createElement from "../../js/createElement.js";
export default function (Win) {

  // 初始化一个应用弹窗(iframe或者VUE组件)
  Win.prototype.__initWindow = function (config) {
    let myWindows = this.myWindows();
    // 获取appid
    let appid = this.getAppid(config);
    if (!appid) {
      return false
    }

    // 创建APP容器
    let appBox = createElement("div", "win-win", appid)
    // 设置zindex 层级
    this.addZindex(appBox, config);
    // 计算宽高
    let width = config.width ? config.width : this.config.width;
    let height = config.height ? config.height : this.config.height;
    appBox.style["width"] = width;
    appBox.style["height"] = height;
    // 计算left和top
    let left = `calc(50% - ${parseInt(width) / 2}px)`;
    let top = `calc(50% - ${parseInt(height) / 2}px)`;
    appBox.style["left"] = left;
    appBox.style["top"] = top;

    appBox.addEventListener("click", e => {
      e.stopPropagation();
      this.addZindex(appBox, config);
    })

    // 顶部标题栏
    config.theme = config.theme ? config.theme : this.config.theme;//主题类名
    //创建页头
    let title = createElement("div", ["win-title", config.theme]);
    // 鼠标按下事件
    title.onmousedown = (e) => {
      // 停止冒泡
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
      // 移动拖拽(当前点击的元素，要移动的元素，遮罩层，移动元素所在区域)
      drag(e, appBox, this.shade, myWindows)
    };
    // 左侧应用名称
    let name = createElement("div", "name");
    name.innerText = config.title ? config.title : this.config.title;//添加标题
    name.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config)
    }
    // 右侧三个按钮
    let btns = createElement("div", "btn-box");
    // 判断配置,是否需要显示最小化按钮
    if (config.showMin || (this.config.showMin && config.showMin !== false)) {
      let minBtn = createElement("span", ["iconfont", "icon-minimum"]);//第一个,最小化
      // 窗口最小化
      minBtn.onclick = () => {
        appBox.classList.add("min");//窗口最小化
        //调用回调函数
        if (typeof config.min == "function") {
          config.min(appid);
        } else {
          this.config.min(appid);
        }
      };
      btns.appendChild(minBtn)

    }
    // 判断配置项，是否需要显示最大化按钮
    if (config.showMax || (this.config.showMax && config.showMax !== false)) {
      let maxBtn = createElement("span", ["iconfont", "icon-xueyuan-quanping"]);//第二个,最大化
      // 窗口最大化
      maxBtn.onclick = () => {
        var isMax = appBox.classList.toggle("max");//切换窗口最大化 toggle:存在则删除,不存在则添加
        if (isMax) {
          maxBtn.classList.remove("icon-xueyuan-quanping")
          maxBtn.classList.add("icon-quanping")
        } else {
          maxBtn.classList.remove("icon-quanping")
          maxBtn.classList.add("icon-xueyuan-quanping")
        }
        //调用回调函数
        if (typeof config.max == "function") {
          config.max(appid, isMax);
        } else {
          this.config.max(appid, isMax);
        }
      };
      btns.appendChild(maxBtn)
    }


    let shutBtn = createElement("span", ["iconfont", "shut", "icon-guanbi1"]);//关闭按钮
    // 关闭窗口
    shutBtn.onclick = () => {
      var callback = typeof config.shut == "function" ? config.shut : this.config.shut;
      this.shutWin(appid, callback);
    };
    btns.appendChild(shutBtn)
    btns.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
    }
    title.appendChild(name)
    title.appendChild(btns)
    appBox.appendChild(title)
    // 内容区域
    let section = createElement("section", "win-section");
    section.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
    }

    return {
      myWindows,
      appBox,
      section
    }
  }

  // 创建一个iframe弹窗
  Win.prototype.html = function (config) {
    if (!config) { config = {} }
    let initWindow = this.__initWindow(config);//初始化数据
    if (!initWindow) {
      return
    }
    let { myWindows, appBox, section } = initWindow;
    // 创建iframs元素
    let iframs = createElement("iframe", "win-iframs");
    iframs.sandbox = "allow-forms allow-scripts allow-same-origin allow-popups";//防止域名重定向,导致整个页面跳转
    iframs.src = config.url ? config.url : this.config.url;
    section.appendChild(iframs)
    appBox.appendChild(section)
    myWindows.appendChild(appBox);//将容器挂载到dom树上并渲染
    // 打开窗口回调
    if (typeof config.open == "function") {
      config.open(appBox.id)
    } else {
      this.config.open(appBox.id)
    }
  }
  // 创建一个VUE组件弹窗
  Win.prototype.vue = function (config) {
    if (!config) { config = {} }
    // 获取组件
    let components = config.components ? config.components : this.config.components;
    if (!components) { return }
    let initWindow = this.__initWindow(config);//初始化数据
    if (!initWindow) {
      return
    }
    let { myWindows, appBox, section } = initWindow;
    let appid = this.getAppid();
    let vueBox = createElement("div", "vue-components", appid);//创建容器
    section.appendChild(vueBox)
    appBox.appendChild(section)
    myWindows.appendChild(appBox);//将容器挂载到dom树上并渲染
    // 创建构造器,将vue组件实例化
    var Profile = this.Vue.extend(config.components);
    // 创建 Profile 实例，并挂载到一个元素上。
    var instance = new Profile({
      propsData: config.props
    })
    instance.$mount(`#${appid}`)// 将实例挂载到容器上。
    // 打开窗口回调
    if (typeof config.open == "function") {
      config.open(appBox.id)
    } else {
      this.config.open(appBox.id)
    }
  }

  return Win;
}