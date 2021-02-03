import drag from "../drag.js";
import createElement from "../../js/createElement.js";
export default function (Win) {
  // 初始化一个应用弹窗(iframe或者VUE组件)
  Win.prototype.__initAlert = function (config) {
    let myWindows = this.myWindows();
    // 获取appid
    let appid = this.getAppid(config);
    if (!appid) {
      return false
    }
    // 创建APP容器
    let appBox = createElement("div", "win-alert", appid)
    // 设置zindex 层级
    this.addZindex(appBox, config);
    // 点击置顶
    appBox.addEventListener("click", e => {
      e.stopPropagation();
      this.addZindex(appBox, config);
    })

    // 顶部标题栏
    config.theme = config.theme ? config.theme : this.config.theme;//主题类名
    //创建页头
    let title = createElement("div", ["alert-title", config.theme]);
    // 鼠标按下事件
    title.onmousedown = (e) => {
      // 停止冒泡
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
      // 移动拖拽(当前点击的元素，要移动的元素，遮罩层，移动元素所在区域)
      drag(e, appBox, this.shade, myWindows)
    };
    // 左侧应用名称
    let name = createElement("div", "name");
    name.innerText = config.title ? config.title : this.config.title;//添加标题
    name.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config)
    }
    // 右侧按钮
    let btns = createElement("div", "btn-box");
    let shutBtn = createElement("span", ["iconfont", "shut"]);//关闭按钮
    shutBtn.innerHTML = "&#xe659;";
    // 关闭窗口
    shutBtn.onclick = () => {
      var callback = typeof config.shut == "function" ? config.shut : this.config.shut;
      this.shutWin(appid, callback);
    }

    btns.appendChild(shutBtn)
    btns.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
    }
    title.appendChild(name)
    title.appendChild(btns)
    appBox.appendChild(title)
    // 内容区域
    let section = createElement("section", "alert-section");
    section.onmousedown = e => {
      e.stopPropagation();
      // 置顶 并且调用回调函数
      this.addZindex(appBox, config);
    }
    // 提示信息
    let info = createElement("p", "info-text")
    info.innerText = config.msg ? config.msg : this.config.msg;
    section.appendChild(info);


    return {
      myWindows,
      appBox,
      section,
    }
  }
  // 弹窗alert提示框
  Win.prototype.alert = function (config) {
    if (!config) { config = {} }
    let initWindow = this.__initAlert(config);//初始化数据
    if (!initWindow) {
      return
    }
    let { myWindows, appBox, section } = initWindow;
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
  // 弹窗输入框
  Win.prototype.prompt = function (config) {
    if (!config) { config = {} }
    let initWindow = this.__initAlert(config);//初始化数据
    if (!initWindow) {
      return
    }
    let { myWindows, appBox, section } = initWindow;
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

  return Win;
}