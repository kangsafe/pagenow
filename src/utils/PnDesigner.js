import PnUtil from './PnUtil'

/**
 * 构建 绝对布局默认配置
 * @returns {{width: string, height: string, backgroundColor: string}}
 */
const buildAbsoluteLayoutConfigData = function () {
  let layoutConfigData = { // 绝对布局默认配置
    width: '1440px',
    height: '900px',
    backgroundColor: 'antiquewhite'
  };
  return layoutConfigData
};

/**
 * 构建 绝对布局布局块默认配置
 * @param payload
 * @returns
 */
const buildAbsoluteLayoutItemConfigData = function (payload) {
  let layoutItemConfigData = {
    id: PnUtil.uuid(),
    layoutItemConfigData: {
      width: '250px',
      height: '250px',
      left: '0px',
      top: '0px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#000',
      backgroundColor: 'yellow',
      zIndex: '1',
      display: 'block',
      compVisible: true,
    },
    component: {
      id: '',
      name: '',
      compConfigData: {

      }
    }
  };
  return layoutItemConfigData
};

/**
 * 构建 响应式布局默认配置
 * @returns {{width: string, height: string, backgroundColor: string, padding: string, rows: Array}}
 */
const buildReactiveLayoutConfigData = function () {
  let layoutConfigData = {
    width: '100%',
    height: '100%',
    backgroundColor: 'antiquewhite',
    padding: '10px',
    rows: []
  };
  return layoutConfigData
};

/**
 * 构建 响应式布局布局块默认配置
 * @param payload
 * @returns {{height: string, backgroundColor: string, padding: string, sort: number}}
 */
const buildReactiveLayoutItemConfigData = function (payload) {
  let layoutItemConfigData = {
    height: '80px',
    backgroundColor: '#66CCFF',
    padding: '0px',
    sort: 1,
  };

  if(payload.rowId) {
    layoutItemConfigData.rowId = payload.rowId
  }
  return layoutItemConfigData
};

export default {
  buildAbsoluteLayoutConfigData,
  buildAbsoluteLayoutItemConfigData,
  buildReactiveLayoutConfigData,
  buildReactiveLayoutItemConfigData
}
