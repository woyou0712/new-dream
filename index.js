import popup from "./popup/index.js";
import rightClick from "./Rclick/index.js";
const install = (Vue) => {
  Vue.use(popup);
  Vue.use(rightClick);
}
export default install