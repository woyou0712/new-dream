# new-dream
[官网地址](http://www.bauble.vip/newdream)
```
为VUE量身定制的一款弹窗类UI组件,不依赖任何第三方组件库,简单轻便
```
## 安装
```
npm install new-dream
```
## 在main.js中引入
### 引入CSS文件
```
import "new-dream/css/main.css";
```
### 全部功能引入
```
import newDream from "new-dream";
Vue.use(newDream);

```
### 也可以按需引入
#### 弹窗(popup)
```
import popup from "new-dream/popup/index.js";
Vue.use(popup);
```

#### 右键(Rclick)
```
import Rclick from "new-dream/Rclick/index.js";
Vue.use(Rclick);
```

# 开始使用
## 弹窗(popup)
### html(iframe)
- 基础用法
```
<script>
export default {
  methods:{
    showHtml(){
      this.$popup.html("http://win10.bauble.top")
    }
  }
}
</script>
```
- 自定义扩展
```
var config = {
  id: null, // 自定义ID,同一ID窗口只允许打开最多一个
  title: "新窗口", // 窗口标题名称
  theme: "theme", // 主题：css类名
  url:"http://win10.bauble.top",//需要展示的网页
  width: "720px",//窗口初始宽度
  height: "500px",//窗口初始高度
  showMin: true, // 是否显示 窗口最小化按钮
  showMax: true, // 是否显示 窗口最大化按钮
  open(appid) { return appid }, // 打开窗口的 回调函数
  shut(appid) { return appid }, // 关闭窗口 回调函数
  top(appid) { return appid }, // 窗口置顶 回调函数
  min(appid) { return appid }, // 窗口最小化 回调函数
  max(appid, isMax) { return { appid, isMax } }, // 窗口最大化/复原 回调函数
}
this.$popup.html(config)
```
### vue(components)
- 基础用法
```
<script>
import vueComponents from "@/components/vueComponents.vue";
export default {
  methods:{
    showComponents(){
      this.$popup.vue(vueComponents,props:Object);
    }
  }
};
</script>
```
- 自定义扩展
```
var config =  {
  id: null, // 自定义ID,同一ID窗口只允许打开最多一个
  title: "新窗口", // 窗口标题名称
  theme: "theme", // 主题：css类名
  components: null,//vue组件；
  props: {},//vue组件内所需要的参数
  width: "720px",//窗口初始宽度
  height: "500px",//窗口初始高度
  showMin: true, // 是否显示 窗口最小化按钮
  showMax: true, // 是否显示 窗口最大化按钮
  open(appid) { return appid }, // 打开窗口的 回调函数
  shut(appid) { return appid }, // 关闭窗口 回调函数
  top(appid) { return appid }, // 窗口置顶 回调函数
  min(appid) { return appid }, // 窗口最小化 回调函数
  max(appid, isMax) { return { appid, isMax } }, // 窗口最大化/复原 回调函数
}
this.$popup.vue(config);
```

### alert(确认提示框)
- 基础用法
```
<script>
export default {
  methods:{
    showAlert(){
      this.$popup.alert("提示消息!",function(appid){
        console.log(appid)
      })
    }
  }
}
</script>
```
- 自定义扩展
```
var config = {
  id: null, // 自定义ID,同一ID窗口只允许打开最多一个
  title: "新窗口", // 窗口标题名称
  theme: "theme", // 主题：css类名
  msg: "提示信息！",//提示信息字符串；
  align: "right",//按钮对齐方式:left/center/left
  confirmName: "确定",// 确定按钮文字
  confirm(appid) { return appid }, // 点击确定回调函数
}
this.$popup.alert(config)
```
### prompt(输入确认框)
- 基础用法
```
<script>
export default {
  methods:{
    showPrompt(){
      this.$popup.prompt("提示消息!",function(appid,value){
        console.log(appid,value)
      })
    }
  }
}
</script>
```
- 自定义扩展
```
var config = {
  id: null, // 自定义ID,同一ID窗口只允许打开最多一个
  title: "新窗口", // 窗口标题名称
  theme: "theme", // 主题：css类名
  msg: "提示信息！",//提示信息字符串；
  align: "right",//按钮对齐方式:left/center/left
  value: "",//弹出输入框默认显示的文字
  placeholder: "请输入",//弹出输入框默占位符
  inputType: "text",//输入框类型
  maxlength: null,//最大输入长度
  inputReg: null,// 输入框验证正则
  inputError: "输入格式不规范！",//输入框验证不合格提示
  confirmName: "确定",// 确定按钮文字
  confirm(appid,value) { return {appid,value} }, // 点击确定回调函数
  cancelName: "取消", // 取消按钮文字
  cancel(appid) { return appid },// 点击取消的回调函数
}
this.$popup.prompt(config)
```
### msg(轻提示)
- 基础用法
```
<script>
export default {
  methods:{
    showMsg(){
       this.$popup.msg("测试轻提示");
    }
  }
}
</script>
```
- 自定义扩展
```
var config =  {
  id: null, // 自定义ID,同一ID窗口只允许打开最多一个
  msg: "提示信息！",//提示信息字符串；
  msgTime: 2000,// 停留时间；
}
this.$popup.msg(config);
```

### shutWin(关闭窗口)
- 关闭全部窗口
```
<script>
export default {
  methods:{
    // 无需参数
    shutWin1(){
      this.$popup.shutWin()
    },
    // 也可以传一个回调函数
    shutWin2(){)
      this.$popup.shutWin(function(){
        console.log("执行完成!")
      })
    },
  }
}
</script>
```
- 关闭指定ID窗口
```
// 传入一个id
this.$popup.shutWin(appid);
// 第二个参数还可以传一个回调函数
this.$popup.shutWin(appid,function(){});
```
- 关闭指定多个ID窗口
```
// 传入一个id数组
this.$popup.shutWin([appid1,appid2,...])
// 第二个参数还可以传一个回调函数
this.$popup.shutWin([appid1,appid2,...],function(){})
```
### restore(还原最小化窗口)
- 还原所有最小化的窗口
```
<script>
export default {
  methods:{
    // 无需参数
    restore(){
      this.$popup.restore()
    }
    // 也可以传一个回调函数
    restore(){
      this.$popup.restore(function(){
        console.log("执行完成!")
      })
    }
  }
}
</script>
```
- 还原指定ID的最小化窗口
```
// 传入一个id (回调函数非必传)
this.$popup.restore(appid,function(){});
```
- 还原多个指定ID的最小化窗口
```
// 传入一个id数组 (回调函数非必传)
this.$popup.restore([appid1,appid2,...],function(){});
```
### 窗口嵌套
- 在窗口内部弹窗
- 外层窗口必须指定ID
- 外层窗口必须为根窗口, 嵌套窗口内部不允许再次嵌套窗口
- 内层弹窗指定属性fatherId:外层窗口ID
```
<!-- 外层窗口 -->
this.$popup.vue({
  id: "vue-nested",
  title: "内部嵌套弹窗",
  components: vueComponent,
});

<!-- 内层窗口 -->
this.$popup.html({
  url: "http://win10.bauble.top",
  fatherId: "vue-nested",
});
```
### 修改全局默认配置
- main.js
```
Vue.prototype.$popup.config.title = "新窗口"; // 打开窗口默认名称
Vue.prototype.$popup.config.theme = "theme"; // 窗口默认主题类名
Vue.prototype.$popup.config.showMinList = true; // 是否在屏幕下方显示最小化的窗口列表


Vue.prototype.$popup.config.url = "win10.bauble.top"; // 默认iframe地址
Vue.prototype.$popup.config.components = components:Object;// 默认打开的VUE组件
Vue.prototype.$popup.config.props = {};// 打开的VUE组件默认传参

Vue.prototype.$popup.config.width = "720px";//html/vue弹窗的默认宽度
Vue.prototype.$popup.config.height = "500px";//html/vue弹窗的默认高度
Vue.prototype.$popup.config.showMin = true;//html/vue是否默认显示窗口最小化按钮
Vue.prototype.$popup.config.showMax = true;//html/vue是否默认显示窗口最大化按钮

Vue.prototype.$popup.config.open = function(appid) { return appid };//打开窗口的默认回调函数
Vue.prototype.$popup.config.shut = function(appid) { return appid };//关闭窗口的默认回调函数
Vue.prototype.$popup.config.top = function(appid) { return appid };//窗口置顶的默认回调函数
Vue.prototype.$popup.config.min = function(appid) { return appid };//窗口最小化的默认回调函数
Vue.prototype.$popup.config.max = function(appid, isMax) { return { appid, isMax } }, // 窗口最大化回调函数

Vue.prototype.$popup.config.msg = "提示信息！";// 默认提示信息
Vue.prototype.$popup.config.msgTime = 2000;// msg默认停留时间；
Vue.prototype.$popup.config.align = "right";//按钮默认显示位置
Vue.prototype.$popup.config.value = "";//prompt 输入框的默认值
Vue.prototype.$popup.config.placeholder = "请输入";//prompt 输入框的默认占位符
Vue.prototype.$popup.config.inputType = "text";//prompt 输入框的默认type
Vue.prototype.$popup.config.maxlength = null;//prompt 输入框长度限制
Vue.prototype.$popup.config.inputReg = null;//prompt 输入框验证正则
Vue.prototype.$popup.config.inputError = "输入格式不规范！";//prompt 输入框数据异常提示(inputReg存在时才生效)
Vue.prototype.$popup.config.confirmName = "确定";//默认确定按钮名称
Vue.prototype.$popup.config.confirm = function(appid,value){};//点击确定的默认回调函数(value仅在prompt时有值)
Vue.prototype.$popup.config.cancelName = "取消";//默认取消按钮名称
Vue.prototype.$popup.config.cancel = function(appid){};//点击取消的默认回调函数

```








---
## 右键(Rclick)
### 绑定页面元素使用

- 基础用法
```
<template>
  <div class="win-box" @contextmenu="contextmenu">
    <h2>右键点击事件触发区域</h2>
  </div>
</template>
<script>
export default {
  methods:{
    contextmenu(event) {
      // event必传
      this.$Rclick.click(event);
    },
  }
}
</script>
<style scoped>
.win-box {
  width: 100%;
  height: 100vh;
  position: relative;
  border: 1px solid #000;
}
</style>
```
- 自定义扩展

```
var config = {
  backgroundColor: "#FFF",//菜单背景色
  // 菜单列表
  menus: [
    { label: "全屏", value: 1, color: "#444", fontWeight: 900 },
    { label: "退出全屏", value: 2, color: "#444" },
    { label: "关于", value: 3, color: "#d00" },
  ],
  open() { return },//打开菜单成功回调函数
  //点击菜单回调函数
  click(value) {
    if (value == 1) {
      console.log("全屏")
    } else if (value == 2) {
      console.log("退出全屏")
    } else if (value == 3) {
      console.log("关于")
    }
  },
  shut() { return },//关闭菜单回调函数
}
this.$Rclick.click(event,config);
```
### 手动关闭菜单
```
<script>
export default {
  methods: {
    shutMenus() {
      this.$Rclick.shutMenus();
    },
  },
};
</script>
```
### 修改全局默认配置
- main.js
```
Vue.prototype.$Rclick.config.backgroundColor = "#FFF";//默认菜单背景色
//默认菜单列表
Vue.prototype.$Rclick.config.menus = [
  { label: "全屏", value: 963280680, color: "#444", fontWeight: 900 },
  { label: "退出全屏", value: 707282658, color: "#444" },
  { label: "关于", value: 850674935, color: "#d00" },
];
Vue.prototype.$Rclick.config.open = function(){};//打开菜单成功默认回调函数
Vue.prototype.$Rclick.config.click = function(value){};//点击菜单选项的默认回调函数
Vue.prototype.$Rclick.config.shut = function(){};//关闭菜单时的默认回调函数


```











