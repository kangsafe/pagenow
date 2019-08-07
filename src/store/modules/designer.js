
import PnUtil from '../../utils/PnUtil'

import { getField, updateField } from 'vuex-map-fields';

const state = {

  // 设计器全局配置
  globalConfigData: {
    snapEnabled: true, // 拖拽中是否打开自动对齐

    absolute: { // 针对绝对布局的配置

    },
    reactive: { // 针对响应式布局的配置

    }
  },

  pageMetadata: {
    id: PnUtil.uuid(),
    name: 'test',
    path: '/test',
    title: '',
    component: '',
    remark: '',
    layout: {
      id: PnUtil.uuid(),
      type: '',
      layoutConfigData: {
        width: '1200px',
        height: '600px',
        backgroundColor: 'antiquewhite'
      },
      layoutItems: [
        {
          id: '',
          layoutItemConfigData: {

          },
          component: {
            id: '',
            name: '',
            compConfigData: {

            }
          }
        }
      ]
    }
  },

  // 当前设计器编辑的页面信息对象
  currentEditPageInfo: {
    id: PnUtil.uuid(),
    name: 'test',
    path: '/test',
    component: '',
    layoutData: {
      id: '',
      layoutCompName: 'AbsoluteLayoutCanvas',
      width: '1200px',
      height: '600px',
      backgroundColor: 'antiquewhite',
      layoutItems: [
        {
          id: PnUtil.uuid(),
          width: '200px',
          height: '300px',
          left: '100px',
          top: '30px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#000',
          backgroundColor: 'red',
          zIndex: '1',
          component: {
            id: '',
            name: '',
            configData: {

            }
          }
        },
        {
          id: PnUtil.uuid(),
          width: '100px',
          height: '100px',
          left: '400px',
          top: '90px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#000',
          backgroundColor: 'blue',
          zIndex: '1',
          component: {
            id: '',
            name: '',
            configData: {

            }
          }
        }
      ]
    },
  },

  rightSidebarComponentName: '', //
  currentSelectLayoutItemId: '', // 当前选中的布局块ID


  rightSidebarFuncCompConfigFormName: '', // 右侧边栏组件编辑区表单名称
  //currentEditFuncCompId: ''
};

const getters = {
  getField,

  /**
   * 根据ID获取布局块对象
   * @param state
   * @returns {*}
   */
  getLayoutItemById (state) {
    return getField(state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId))
  },

  getLayoutItemById2: (state) => (id) => {
    return state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.id==id)
  }

  /**
   * 根据布局块ID获取组件对象
   * @param state
   * @returns {*}
   */
  // getComponentByLayoutItemId (state) {
  //   return getField(state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.component.id==state.currentEditFuncCompId))
  // }
};

const actions = {

};

const mutations = {

  updateField,



  setCurrentEditPageInfo (state, pageInfo) {
    state.currentEditPageInfo = pageInfo
  },

  updateLayoutData (state, payload) {
    state.currentEditPageInfo.layoutData = payload
  },

  /**
   * 设置布局块的左和上偏移
   * @param state
   * @param payload
   */
  setLayoutItemLeftAndTop (state, payload) {
    let obj = state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.id==payload.id);
    obj.left = payload.left;
    obj.top = payload.top;
  },

  /**
   * 设置布局块的层级zIndex
   * @param state
   * @param payload
   */
  setLayoutItemZIndex (state, payload) {
    for (let i = 0; i < state.currentEditPageInfo.layoutData.layoutItems.length; i++) {
      if (state.currentEditPageInfo.layoutData.layoutItems[i].id == payload.id) {
        state.currentEditPageInfo.layoutData.layoutItems[i].zIndex = '2'
      }else {
        state.currentEditPageInfo.layoutData.layoutItems[i].zIndex = '1'
      }
    }
  },

  /**
   * 设置布局块的宽度和高度
   * @param state
   * @param payload
   */
  setLayoutItemWidthAndHeight (state, payload) {
    let obj = state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.id==payload.id);
    obj.width = payload.width;
    obj.height = payload.height;
  },

  /**
   * 添加布局块
   * @param state
   * @param layoutItem
   */
  addLayoutItem(state, layoutItem) {
    state.currentEditPageInfo.layoutData.layoutItems.push(layoutItem)
  },


  setRightSidebarComponentName (state, compName) {
    state.rightSidebarComponentName = compName
  },
  setCurrentSelectLayoutItemId (state, layoutItemId) {
    state.currentSelectLayoutItemId = layoutItemId;
  },
  updateLayoutItem (state, field) {
    updateField(state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId), field);
  },


  setRightSidebarFuncCompConfigFormName (state, payload) {
    state.rightSidebarFuncCompConfigFormName = payload
  },
  // updateComponent (state, field) {
  //   updateField(state.currentEditPageInfo.layoutData.layoutItems.find(o=>o.component.id==state.currentEditFuncCompId), field)
  // }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

