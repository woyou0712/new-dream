import createElement from "@/newDream/js/createElement";

/**
 * 创建一个prompt弹窗
 * @param {Object} config
 * @param {Function} confirmFun
 * */
export default function (config,confirmFun) {
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
  let initWindow = this.__initAlert(config);//初始化数据
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
  // 输入框
  let input = createElement("input", "win-ipt");
  input.placeholder = config.placeholder ? config.placeholder : this.config.placeholder;//获取占位符
  input.type = config.inputType ? config.inputType : this.config.inputType;// 获取输入框类型
  var maxLength = config.maxlength ? config.maxlength : this.config.maxlength;// 获取最大长度
  if (maxLength) {
    input.maxLength = String(maxLength);//如果有，则将属性添加到元素上（添加maxlength属性L必须大写）
  }
  let value = config.value ? config.value : this.config.value;//获取默认值
  input.value = value;
  section.appendChild(input);//挂载到父元素
  let reg = config.inputReg ? config.inputReg : this.config.inputReg;//获取输入值的验证正则
  // 如果有验证正则，则创建错误提示元素
  let errElement;
  if (reg) {
    errElement = createElement("p", "err-text");
    section.appendChild(errElement);
  }
  let errText = config.inputError ? config.inputError : this.config.inputError;//获取输入错误提示
  //
  input.addEventListener("input", (e) => {
    value = e.target.value;
    // 验证正则
    if (reg) {
      var bool = reg.test(value);
      if (!bool) {
        errElement.innerText = errText;
      } else {
        errElement.innerText = "";
      }
    }
  });

  // 确定按钮
  let confirm = createElement("button", "win-confirm-btn");
  confirm.innerText = config.confirmName ? config.confirmName : this.config.confirmName;
  bottomBtnBox.appendChild(confirm);//挂载到父元素
  // 点击事件
  confirm.addEventListener("click", () => {
    // 验证正则
    if (reg) {
      var bool = reg.test(value);
      if (!bool) {
        errElement.innerText = errText;
        return;
      }
    }
    // 关闭窗口
    myWindows.removeChild(appBox);
    // 调用回调函数
    if (typeof config.confirm == "function") {
      config.confirm(appBox.id, value)
    } else {
      this.config.confirm(appBox.id, value)
    }
  })
  // 取消按钮
  let cancel = createElement("button", "win-cancel-btn");
  cancel.innerText = config.cancelName ? config.cancelName : this.config.cancelName;
  bottomBtnBox.appendChild(cancel);
  // 点击事件
  cancel.addEventListener("click", () => {
    // 关闭窗口
    myWindows.removeChild(appBox);
    // 调用回调函数
    if (typeof config.cancel == "function") {
      config.cancel(appBox.id)
    } else {
      this.config.cancel(appBox.id)
    }
  })

  appBox.appendChild(section);
  appBox.appendChild(bottomBtnBox);
  //最后再将容器挂载到dom树上并渲染，避免多次渲染
  myWindows.appendChild(appBox);
}
