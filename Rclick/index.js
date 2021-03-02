// 引入构造函数
import Rclick from "./Rclick";

// 创建菜单盒子
import createMenusBox from "./method/createMenusBox";

Rclick.prototype.createMenusBox = createMenusBox;


// 引入并注册菜单配置选项;
import setMenus from "./method/setMenus.js";

setMenus(Rclick)


/**为当前元素添加右键事件 */
import $click from "./method/showClickMenus";

Rclick.prototype.click = $click;

/** 关闭菜单 */
import shutMenus from "./method/shutMenus";

Rclick.prototype.shutMenus = shutMenus;


export default new Rclick();
