/**创建元素 */
export default function (ename, classList, eid) {
  /**
   * ename:元素名称例如"div"
   * classList:为元素添加的类名称数组
   * eid:为元素添加的ID
   */
  var el = document.createElement(ename);
  if (typeof classList == "string") {
    el.classList.add(classList);
  } else if (Array.isArray(classList) && classList.length) {
    for (var item of classList) {
      el.classList.add(item);
    }
  }
  if (eid) {
    el.id = eid;
  }
  return el;
}