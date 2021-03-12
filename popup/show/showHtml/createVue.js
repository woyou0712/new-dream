import createElement from "../../../js/createElement";

/**
 * 创建一个VUE组件弹窗
 * @param {Object} config 配置项
 * */
export default function (config, props) {
  if (!config) {
    config = {}
  }
  // 如果传入的直接就是组件，则包装一层
  if (typeof config.__file == "string") {
    config = {components: config, props}
  }
  // 获取组件
  let components = config.components ? config.components : this.config.components;
  if (!components) {
    return
  }
  let initWindow = this.__initWindow(config);//初始化数据
  if (!initWindow) {
    return
  }
  let {myWindows, appBox, section} = initWindow;
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
