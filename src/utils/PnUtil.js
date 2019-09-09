/* eslint-disable no-useless-escape */
import router from '../router'

/**
 * 生成UUID
 * @returns {string}
 */
const uuid = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
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

/**
 * 获取反色差值
 * @param hexcolor (示例：FFFFFF)
 * @returns {string}
 */
const getContrastYIQ = function (hexcolor) {
  let r = parseInt(hexcolor.substr(0,2),16);
  let g = parseInt(hexcolor.substr(2,2),16);
  let b = parseInt(hexcolor.substr(4,2),16);
  let yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
};

/**
 * 判断是否为Mac系统
 * @returns {*|boolean}
 */
const isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

/**
 * 判断是否为Windows系统
 * @returns {*|boolean}
 */
const isWindows = function () {
  return /windows|win32/i.test(navigator.userAgent);
};

/**
 * 删除iView的Table中行数据的一些前端无用字段，提供给后端JFinal更新使用
 * @param obj
 * @returns {*}
 */
const deleteTableRowUselessField = function (obj) {
  if(obj) {
    let newObj = Object.assign({}, obj);
    delete newObj._index;
    delete newObj._rowKey;
    return newObj
  }
  return null
};

/**
 * css样式文本转Vue专用的Style对象
 * @param cssStr
 */
const cssToVueStyleObj = function (cssStr) {
  let styleObj = {};

  if (cssStr) {
    // 去除空格和换行
    cssStr = cssStr.replace(/\ +/g, '').replace(/[\r\n]/g, '');
    // 去除 '{' 和 '}'
    cssStr = cssStr.replace('{','').replace('}','');

    // 拆分样式项并组成样式项数组
    let cssItems = cssStr.split(';');

    cssItems.forEach(cssItem => {
      if(cssItem) {
        let attr = cssItem.split(':')[0]; // 样式项键
        let val = cssItem.split(':')[1];  // 样式项值

        // 定义一个数组存储属性键中'-'出现的位置
        let positions = [];
        let pos = attr.indexOf('-');
        while (pos > -1) {
          positions.push(pos);
          pos = attr.indexOf('-', pos + 1);
        }

        if(positions.length > 0) {
          // 定义一个数组存储每一次出现'-'符号时要处理的替换数据
          let replaceArr = [];
          for (let i=0; i<positions.length; i++) {
            // 待替换字符
            let awaitReplaceStr = attr.substring(positions[i], positions[i]+2);
            // 替换的字符
            let newStr = attr.substring(positions[i]+1, positions[i]+2);

            replaceArr.push({
              awaitReplaceStr: awaitReplaceStr,
              newStr: newStr.toLocaleUpperCase() //替换的字符要转成大写
            });
          }

          replaceArr.forEach(item=>{
            attr = attr.replace(item.awaitReplaceStr, item.newStr)
          })
        }

        styleObj[attr] = val

      }
    });
  }

  return styleObj;
};

export default {
  uuid,
  getTimestamp,
  openPageToBlank,
  getContrastYIQ,
  isMac,
  isWindows,
  deleteTableRowUselessField,
  cssToVueStyleObj
}
