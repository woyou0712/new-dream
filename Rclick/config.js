import simFun from "./method/simFun";

export default {
  backgroundColor: "#FFF",
  menus: [
    {label: "全屏", value: 963280680, color: "#444", fontWeight: 900},
    {label: "退出全屏", value: 707282658, color: "#444"},
    {label: "关于", value: 850674935, color: "#d00"},
  ],
  open() {
    return
  },//打开菜单成功回调函数
  //点击菜单回调函数
  click(value) {
    if (value == 963280680) {
      simFun.maxWindows()
    } else if (value == 707282658) {
      simFun.quitMax()
    } else if (value == 850674935) {
      simFun.inRegardTo()
    }
  },
  shut() {
    return
  },//关闭菜单回调函数
}
