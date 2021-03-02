import popup from "./popup/index.js";
import rightClick from "./Rclick/index.js";
/**
 * 注册成VUE组件
 * @param {Vue} Vue
 * */
const install = (Vue) => {
  Vue.prototype.$popup = popup
  Vue.prototype.$Rclick = rightClick
}
export default install
