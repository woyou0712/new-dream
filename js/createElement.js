/**
 * 创建元素
 * @param {String} ename 标签名称
 * @param {String,Array} classList 类名、类名列表
 * @param {String} eid 元素ID
 * */
export default function (ename, classList, eid) {
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
