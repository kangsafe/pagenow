import PnUtil from './PnUtil'

/**
 * 构建 绝对布局默认配置
 * @returns {{width: string, height: string, backgroundColor: string}}
 */
const buildAbsoluteLayoutConfigData = function () {
  let layoutConfigData = { // 绝对布局默认配置
    width: '1440px',
    height: '900px',
    backgroundColor: '#999999',
    customStyleCode: {}
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
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000',

      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',

      backgroundColor: 'yellow',
      mouseenterBackgroundColor: '',
      mouseleaveBackgroundColor: '',
      zIndex: 1,
      padding: '0px',
      display: 'block',

      customStyleCode: {}
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
    backgroundColor: '#999999',
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

/**
 * 构建 Echart组件默认配置
 * @returns {{useUrlParam: boolean, apiPath: string}}
 */
const buildEchartConfigDataTemp = function () {
  let configDataTemp = {
    useUrlParam: false,           // 使用URL参数
    apiPath: '',                  // 接口地址
    useApiPath: false,            // 是否调用接口获取数据
    customJsCode: '',             // 自定义JS代码
    onlyUseCustomJsCode: false,   // 只使用自定义JS代码逻辑
  };
  return configDataTemp
};

export default {
  buildAbsoluteLayoutConfigData,
  buildAbsoluteLayoutItemConfigData,
  buildReactiveLayoutConfigData,
  buildReactiveLayoutItemConfigData,
  buildEchartConfigDataTemp
}
