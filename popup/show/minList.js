import createElement from "../../js/createElement.js";
import restoreSvg from "../../svg/restoreSvg.js";
/**
 *
 * @param {Win} Win
 */
export default function (Win) {
  /**
   * 创建最小化列表项
   * @param {Element} windowsBox 窗口所在盒子容器
   * @param {String} fatherId 外层窗口ID
   */
  Win.prototype.minList = function (windowsBox, fatherId) {
    let styleSelect = `.win-windows-box>.win-min-list`
    if (fatherId) {
      styleSelect = `#${fatherId} .win-min-list`
    }
    let list = document.querySelector(styleSelect)
    if (!list) {
      list = createElement("div", ["win-min-list", this.config.theme])
      windowsBox.appendChild(list);
    }
    if (fatherId) {
      list.style.position = "absolute"
    }

    return list
  }
  /**
   * 添加最小化窗口到列表
   * @param {Elenent} windowsBox
   * @param {String} appid
   * @param {String} title
   * @param {String} fatherId
   */
  Win.prototype.addMinList = function (windowsBox, appid, title, fatherId) {
    let minList = this.minList(windowsBox, fatherId);
    let item = createElement("div", "min-item");

    item.id = `min-${appid}`
    let name = createElement("span", "min-name");
    name.innerText = title;
    let restoreBtn = createElement("span", "win-icon");
    restoreBtn.innerHTML = restoreSvg;
    restoreBtn.addEventListener("click", e => {
      e.stopPropagation();
      this.restore(appid)
    })
    item.appendChild(name)
    item.appendChild(restoreBtn)
    minList.appendChild(item)
  }
}



























