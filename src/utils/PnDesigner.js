const buildAbsoluteLayoutConfigData = function () {
  let layoutConfigData = { // 绝对布局默认配置
    width: '1440px',
    height: '900px',
    backgroundColor: 'antiquewhite'
  };
  return layoutConfigData
};

const buildReactiveLayoutConfigData = function () {
  let layoutConfigData = { // 响应式布局默认配置
    width: '100%',
    height: '100%',
    backgroundColor: 'antiquewhite',
    padding: '10px',
    rows: []
  };
  return layoutConfigData
};

const buildReactiveLayoutItemConfigData = function (payload) {
  let layoutItemConfigData = { // 响应式布局布局块默认配置
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
  buildReactiveLayoutConfigData,
  buildReactiveLayoutItemConfigData
}
