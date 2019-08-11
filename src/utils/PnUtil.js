import router from '../router'

/**
 * 生成UUID
 * @returns {string}
 */
const uuid = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

/**
 * 获取当前时间戳
 * @returns {number}
 */
const getTimestamp = function () {
  return new Date().getTime();
};

/**
 * 打开一个新的页面
 * @param path
 * @param query
 */
const openPageToBlank = function (path, query) {
  let routeUrl = router.resolve({
    path: path,
    query: query
  });
  window.open(routeUrl.href, '_blank');
};

export default {
  uuid,
  getTimestamp,
  openPageToBlank
}
