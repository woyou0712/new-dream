// 引入构造函数
import Win from "./Win";

// 获取包裹弹窗的容器
import createWindow from "./method/createWindow";

Win.prototype.createWindow = createWindow;

// 创建拖拽遮罩层
import createShade from "./method/createShade";

Win.prototype.createShade = createShade;


// 设置Zindex层
Win.prototype.zIndex = 1000;
import setZindex from "./method/setZindex";

Win.prototype.setZindex = setZindex;

// 获取ID,每个窗口都有不一样的ID
Win.prototype.id = 0;
import getAppid from "./method/getAppid";

Win.prototype.getAppid = getAppid
// 关闭窗口方法
import shutWindow from "./method/shutWindow";

Win.prototype.shutWin = shutWindow
// 恢复已经最小化的窗口
import restoreMinWindow from "./method/restoreMinWindow";

Win.prototype.restore = restoreMinWindow
// 注册最小化窗口列表
import minList from "./show/minList.js";

minList(Win);
// 注册页面弹窗
import showHtml from "./show/showHtml/index";

showHtml(Win);
// 注册轻提示弹窗
import showMsg from "./show/showMsg/index";

showMsg(Win);
// 注册确认提示框
import showAlert from "./show/showAlert/index";

showAlert(Win);


export default new Win();
