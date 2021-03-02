/**
 * 恢复最小化窗口
 * @param {String,Array} appids 窗口ID
 * @param {Function} callback 回调函数
 * */
export default function (appids, callback) {
  // 如果:不传参数 或者 只传一个回调函数 则是恢复全部最小化的窗口
  if (!appids || typeof appids == "function") {
    let minWins = [...document.querySelectorAll(".win-win.min")];
    for (var item of minWins) {
      item.classList.remove("min")
      this.shutWin(`min-${item.id}`)
    }
    if (typeof appids == "function") {
      appids();
    }
    return
  }
  // 恢复一个指定窗口
  if (typeof appids == "string") {
    appids = [appids]
  }
  // 恢复多个指定窗口
  if (Array.isArray(appids) && appids.length) {
    for (var appid of appids) {
      let minWin = document.getElementById(appid);
      minWin.classList.remove("min")
      // 并删除最小化标签
      this.shutWin(`min-${appid}`)
    }
    if (typeof callback == "function") {
      callback();
    }
    return
  }
}
