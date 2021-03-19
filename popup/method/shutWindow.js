/**
 * 关闭窗口
 * @param {String,Array} appids 窗口ID
 * @param {Function} callback 回调函数
 * */
export default function (appids, callback) {
  // 如果:不传参数 或者 只传一个回调函数 则是全部关闭
  if (!appids || typeof appids == "function") {
    if (this.windowsBox) {
      this.windowsBox.innerHTML = "";
    }
    if (typeof appids == "function") {
      appids();
    }
    return;
  }
  // 只关闭一个:可以直接传ID
  if (typeof appids == "string") {
    appids = [appids]
  }
  // 关闭多个:ID数组
  if (Array.isArray(appids) && appids.length) {
    for (var item of appids) {
      let app = document.getElementById(item);
      if (app) {
        let parent = app.parentNode;
        parent.removeChild(app)
      }
      // 尝试获取最小化列表标签并关闭
      let mins = document.getElementById(`min-${item}`);
      if (mins) {
        let parent = mins.parentNode;
        parent.removeChild(mins)
      }
    }
    if (typeof callback == "function") {
      callback(appids);
    }
    return
  }

}
