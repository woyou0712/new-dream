/**
 * 获取、生成appid
 * @param {Object} config
 * */
export default function (config) {
  if (!config) {
    config = {}
  }
  this.id += 1;
  // 得到即将要打开的窗口ID
  let appid = config.id ? config.id : `win-${this.id}-app`;
  // 尝试获取该窗口
  let win = document.getElementById(appid);
  // 如果窗口已存在
  if (win) {
    this.restore(appid);// 尝试 移除最小化 恢复窗口
    this.setZindex(win, config);// 置顶该窗口
    return false
  }
  return appid;
}
