/**
 * 生成SVG
 * @param {Number} pid svg标签的p-id
 * @param {String} path svg标签内部的path标签
 */
export default function (pid, path) {
  let svg = `<svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="${pid}"
            >${path}</svg>`
  return svg
}