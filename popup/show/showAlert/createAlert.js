import createElement from "@/newDream/js/createElement";

/**
 * 创建一个alert弹窗
 * @param {Object} config
 * @param {Function} confirmFun
 * */
export default function (config, confirmFun) {
  if (!config) {
    config = {}
  }
  // 如果第一次参数传入的是字符串，则包装成对象
  if (typeof config == "string") {
    config = {msg: config}
    // 第一个参数为字符串的情况下，第二个参数是一个函数，则作为回调函数配置
    if (confirmFun && typeof confirmFun == "function") {
      config.confirm = confirmFun
    }
  }

  let initWindow = this.__initAlert(config); // 初始化数据
  if (!initWindow) {
    return
  }
  let {myWindows, appBox, section} = initWindow;
  // 底部按钮容器
  let bottomBtnBox = createElement("div", "bottom-btn-box");
  if (config.align && ["left", "center", "left"].indexOf(config.align) != -1) {
    bottomBtnBox.style["text-align"] = config.align;
  } else {
    bottomBtnBox.style["text-align"] = this.config.align;
  }
  // 确定按钮
  let confirm = createElement("button", "win-confirm-btn");
  confirm.innerText = config.confirmName ? config.confirmName : this.config.confirmName;
  // 点击事件
  confirm.addEventListener("click", () => {
    // 关闭窗口
    myWindows.removeChild(appBox);
    if (typeof config.confirm == "function") {
      config.confirm(appBox.id)
    } else {
      this.config.confirm(appBox.id)
    }
  })
  bottomBtnBox.appendChild(confirm);//挂载到父元素

  appBox.appendChild(section);
  appBox.appendChild(bottomBtnBox);
  myWindows.appendChild(appBox);//将容器挂载到dom树上并渲染
}
