// 全局配置
const config = {
  /**
   * 公共部分
   */
  id: null, // 自定义固定ID,固定ID窗口只允许打开最多一个
  title: "新窗口", // 应用名称
  theme: "theme", // 主题：css类名

  /**
   * html/vue 大窗口
   */
  url: "htt" + "p://" + "ww" + "w.bau" + "ble.t" + "op", // html：完整的URL地址；
  components: null,//vue：vue组件；
  props: {},//vue组件内所需要的参数
  width: "720px",
  height: "500px",
  showMin: true, // 是否显示 窗口最小化
  showMax: true, // 是否显示 窗口最大化
  showMinList: true, // 是否显示 窗口最小化列表
  open(appid) { return appid }, // 打开窗口的回调函数
  shut(appid) { return appid }, // 关闭窗口回调函数
  top(appid) { return appid }, // 窗口置顶回调函数
  min(appid) { return appid }, // 窗口最小化回调函数
  max(appid, isMax) { return { appid, isMax } }, // 窗口最大化回调函数

  /**
   * 轻提示 ， 确认框等小提示
   */
  msg: "提示信息！",//提示信息字符串；

  // 轻提示
  msgTime: 2000,// 存在的时间；

  // 提示弹窗
  align: "right",//按钮对齐方式（left,center,left）
  value: "",//prompt 弹出输入框默认显示的文字
  placeholder: "请输入",//prompt 弹出输入框默占位符
  inputType: "text",//输入框类型
  maxlength: null,//最大输入长度
  inputReg: null,// 输入框验证正则
  inputError: "输入格式不规范！",//输入框验证不合格提示

  confirmName: "确定",// 确定按钮文字
  confirm(appid, value) { return { appid, value } }, // 点击确定回调函数
  cancelName: "取消", // 取消按钮文字
  cancel(appid) { return appid },// 点击取消的回调函数
}
/**创建构造函数 */
function Win(Vue) {
  this.Vue = Vue;
  // 全局配置项
  this.config = config;
  this.windowsBox = null;
  this.shade = null;
}

// 获取包裹弹窗的容器
Win.prototype.myWindows = function () {
  // 如果未挂载到页面，则先挂载
  if (!this.windowsBox) {
    this.windowsBox = document.createElement("div");
    this.windowsBox.classList.add("win-windows-box");
    // 阻止右键默认事件
    this.windowsBox.oncontextmenu = e => {
      e.stopPropagation();
      e.preventDefault();
    };
    document.body.appendChild(this.windowsBox);
    console.log("将容器挂载到了页面")
  }
  this.createShade();
  return this.windowsBox;
};

Win.prototype.createShade = function () {
  if (!this.shade) {
    // 创建遮罩层/避免鼠标拖入iframe窗口时出现卡顿现象
    this.shade = document.createElement("div");
    this.shade.classList.add("win-app-shade");
  }
  return this.shade;
}



// 设置Zindex层
Win.prototype.zIndex = 1000;
Win.prototype.addZindex = function (element, config) {
  // 如果已经是最顶层，则停止置顶
  if (element.style["z-index"] == this.zIndex) {
    return;
  }
  this.zIndex += 1;
  element.style["z-index"] = this.zIndex;
  if (!config) { return }
  if (typeof config.top == "function") {
    config.top(element.id);
  } else {
    this.config.top(element.id);
  }
}
// 设置ID,每个窗口都有不一样的ID
Win.prototype.id = 0;
Win.prototype.getAppid = function (config) {
  if (!config) { config = {} }
  this.id += 1;
  // 得到即将要打开的窗口ID
  let appid = config.id ? config.id : `win-${this.id}-app`;
  // 尝试获取该窗口
  let win = document.getElementById(appid);
  // 如果窗口已存在
  if (win) {
    this.restore(appid);// 尝试 移除最小化 恢复窗口
    this.addZindex(win, config);// 置顶该窗口
    return false
  }
  return appid;
}
// 关闭窗口方法
Win.prototype.shutWin = function (appids, callback) {
  // 如果:不传参数 或者 只传一个回调函数 则是全部关闭
  if (!appids || typeof appids == "function") {
    this.windowsBox.innerHTML = "";
    if (typeof appids == "function") {
      appids();
    }
    return;
  }
  // 只关闭一个:可以直接传ID
  if (typeof appids == "string") {
    let app = document.getElementById(appids);
    if (app) {
      this.windowsBox.removeChild(app)
      if (typeof callback == "function") {
        callback(appids);
      }
    }
    return
  }
  // 关闭多个:ID数组
  if (Array.isArray(appids) && appids.length) {
    for (var item of appids) {
      let app = document.getElementById(item);
      if (app) {
        this.windowsBox.removeChild(app)
      }
    }
    if (typeof callback == "function") {
      callback(appids);
    }
    return
  }

}
// 恢复已经最小化的窗口
Win.prototype.restore = function (appids, callback) {
  // 如果:不传参数 或者 只传一个回调函数 则是恢复全部最小化的窗口
  if (!appids || typeof appids == "function") {
    let minWins = [...document.querySelectorAll(".win-windows-box>.min")];
    for (var item of minWins) {
      item.classList.remove("min")
    }
    if (typeof appids == "function") {
      appids();
    }
    return
  }
  // 恢复一个指定窗口
  if (typeof appids == "string") {
    let minWin = document.getElementById(appids);
    minWin.classList.remove("min")
    if (typeof callback == "function") {
      callback();
    }
    return
  }
  // 恢复多个指定窗口
  if (Array.isArray(appids) && appids.length) {
    for (var appid of appids) {
      let minWin = document.getElementById(appid);
      minWin.classList.remove("min")
    }
    if (typeof callback == "function") {
      callback();
    }
    return
  }
}

// 注册页面弹窗
import showHtml from "./show/showHtml.js";
showHtml(Win);
// 注册轻提示弹窗
import showMsg from "./show/showMsg.js";
showMsg(Win);
// 注册确认提示框
import showAlert from "./show/showAlert.js";
showAlert(Win);

const install = (Vue) => {
  // 实例化组件
  const app = new Win(Vue);
  const popup = new Vue({
    data() {
      return {
        config,
      }
    },
    methods: {
      // 打开iframe网页
      html(config) {
        if (!config) { config = {} }
        if (typeof config == "string") {
          config = { url: config }
        }
        app.html(config)
      },
      // 打开Vue组件
      vue(config, props) {
        if (!config) { config = {} }
        // 如果传入的直接就是组件，则包装一层
        if (typeof config.__file == "string") {
          config = { components: config, props }
        }
        app.vue(config)
      },
      // 轻提示
      msg(config) {
        if (config && typeof config == "string") {
          config = { msg: config }
        }
        app.msg(config)
      },
      // 弹出确认框
      alert(config, confirm) {
        if (config && typeof config == "string") {
          config = { msg: config, confirm }
        }
        app.alert(config)
      },
      // 弹窗输入框
      prompt(config, confirm) {
        if (config && typeof config == "string") {
          config = { msg: config, confirm }
        }
        app.prompt(config)
      },
      // 恢复已经最小化窗口
      restore(appids, callback) {
        app.restore(appids, callback)
      },
      // 关闭窗口
      shutWin(appids, callback) {
        app.shutWin(appids, callback)
      }
    },
  })
  Vue.prototype.$popup = popup
}

export default install