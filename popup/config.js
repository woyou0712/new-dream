/**
 * 全局默认配置
 * */
export default  {
  /**
   * 公共部分
   */
  id: null, // 自定义固定ID,固定ID窗口只允许打开最多一个
  title: "新窗口", // 应用名称
  theme: "theme", // 主题：css类名
  fatherId: null, // 父窗口ID
  /**
   * html/vue 大窗口
   */
  url: "http://www.bauble.vip", // html：完整的URL地址；
  components: null,//vue：vue组件；
  props: {},//vue组件内所需要的参数
  width: "720px",
  height: "500px",
  showMin: true, // 是否显示 窗口最小化
  showMax: true, // 是否显示 窗口最大化
  showMinList: true, // 是否显示 窗口最小化列表
  open(appid) {
    return appid
  }, // 打开窗口的回调函数
  shut(appid) {
    return appid
  }, // 关闭窗口回调函数
  top(appid) {
    return appid
  }, // 窗口置顶回调函数
  min(appid) {
    return appid
  }, // 窗口最小化回调函数
  max(appid, isMax) {
    return { appid, isMax }
  }, // 窗口最大化回调函数

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
  confirm(appid, value) {
    return { appid, value }
  }, // 点击确定回调函数
  cancelName: "取消", // 取消按钮文字
  cancel(appid) {
    return appid
  },// 点击取消的回调函数
}
