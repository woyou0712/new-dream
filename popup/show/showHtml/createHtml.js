import createElement from "@/newDream/js/createElement";

/**
 * 创建一个iframs窗口
 * @param {Object} config
 * */
export default function (config) {
  if (!config) {
    config = {}
  }
  if (typeof config == "string") {
    config = {url: config}
  }
  let initWindow = this.__initWindow(config);//初始化数据
  if (!initWindow) {
    return
  }
  let {myWindows, appBox, section} = initWindow;
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
