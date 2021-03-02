/**
 * 右键点击显示菜单
 * @param {Element} e 事件触发元素
 * @param {Object} config 配置选项
 * */
export default function (e, config) {
  if (!e || !e.target || isNaN(e.clientX) || isNaN(e.clientY)) {
    console.error("第一个参数必须是event");
    return
  }
  if (!config) {
    config = this.config
  }
  e.stopPropagation();//停止冒泡
  e.preventDefault();//阻止默认事件
  this.showMenus(e, config)
  if (typeof config == "function") {
    config()
  } else if (typeof config.open == "function") {
    config.open()
  } else {
    this.config.open()
  }
}
