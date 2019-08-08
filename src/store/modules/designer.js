
import PnUtil from '../../utils/PnUtil'

import { getField, updateField } from 'vuex-map-fields';

const state = {

  // 设计器全局配置
  globalConfigData: {
    snapEnabled: false, // 拖拽中是否打开自动对齐

    absolute: { // 针对绝对布局的配置

    },
    reactive: { // 针对响应式布局的配置

    }
  },

  // 页面源数据
  pageMetadata: {
    id: PnUtil.uuid(),
    name: 'test',
    path: '/test',
    title: '',
    component: '',
    remark: '',
    layout: {
      id: PnUtil.uuid(),
      developCanvas: 'ReactiveLayoutCanvas', // 画布组件名称
      layoutConfigData: {
        width: '100%',
        height: '100%',
        backgroundColor: 'antiquewhite',
        padding: '10px',
        rows: [
          // {
          //   id: '88888888',
          //   gutter: 10
          // },
          // {
          //   id: '99999999',
          //   gutter: 16
          // }
        ]
      },

      layoutItems: [
        // {
        //   id: PnUtil.uuid(),
        //   layoutItemConfigData: {
        //     rowId: '88888888',
        //     height: '80px',
        //     backgroundColor: '#66CCFF'
        //   },
        //   component: {
        //     id: '',
        //     name: '',
        //     compConfigData: {
        //
        //     }
        //   }
        // },
        // {
        //   id: PnUtil.uuid(),
        //   layoutItemConfigData: {
        //     rowId: '88888888',
        //     height: '80px',
        //     backgroundColor: '#66CCFF'
        //   },
        //   component: {
        //     id: '',
        //     name: '',
        //     compConfigData: {
        //
        //     }
        //   }
        // }
      ]
    }
  },

  /*pageMetadata: {
    id: PnUtil.uuid(),
    name: 'test',
    path: '/test',
    title: '',
    component: '',
    remark: '',
    layout: {
      id: PnUtil.uuid(),
      developCanvas: 'AbsoluteLayoutCanvas', // 画布组件名称
      layoutConfigData: {
        width: '1200px',
        height: '600px',
        backgroundColor: 'antiquewhite'
      },
      layoutItems: [
        {
          id: PnUtil.uuid(),
          layoutItemConfigData: {
            width: '200px',
            height: '300px',
            left: '100px',
            top: '30px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: 'red',
            zIndex: '1',
            display: 'block'
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
  },*/


  rightSidebarComponentName: '', //
  currentSelectLayoutItemId: '', // 当前选中的布局块ID


  rightSidebarFuncCompConfigFormName: '', // 右侧边栏组件编辑区表单名称
  //currentEditFuncCompId: ''
};

const getters = {
  getField,

  getLayoutItem (state) {
    return getField(state.pageMetadata.layout.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId))
  },

  getLayoutItemById: (state) => (id) => {
    return state.pageMetadata.layout.layoutItems.find(o=>o.id==id)
  }


};

const actions = {

};

const mutations = {

  updateField,

  /**
   * 设置布局块的左和上偏移
   * @param state
   * @param payload
   */
  setLayoutItemLeftAndTop (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.layoutItemConfigData.left = payload.left;
    obj.layoutItemConfigData.top = payload.top;
  },

  /**
   * 设置布局块的层级zIndex
   * @param state
   * @param payload
   */
  setLayoutItemZIndex (state, payload) {
    for (let i = 0; i < state.pageMetadata.layout.layoutItems.length; i++) {
      if (state.pageMetadata.layout.layoutItems[i].id == payload.id) {
        state.pageMetadata.layout.layoutItems[i].layoutItemConfigData.zIndex = '2'
      }else {
        state.pageMetadata.layout.layoutItems[i].layoutItemConfigData.zIndex = '1'
      }
    }
  },

  /**
   * 设置布局块的宽度和高度
   * @param state
   * @param payload
   */
  setLayoutItemWidthAndHeight (state, payload) {
    let obj = state.pageMetadata.layout.layoutItems.find(o=>o.id==payload.id);
    obj.layoutItemConfigData.width = payload.width;
    obj.layoutItemConfigData.height = payload.height;
  },

  /**
   * 添加布局块
   * @param state
   * @param layoutItem
   */
  addLayoutItem(state, layoutItem) {
    state.pageMetadata.layout.layoutItems.push(layoutItem)
  },

  /**
   * 添加响应式布局的行对象
   * @param state
   * @param row
   */
  addRow (state, row) {
    state.pageMetadata.layout.layoutConfigData.rows.push(row)
  },

  /**
   *
   * @param state
   * @param rowId
   */
  deleteRow (state, rowId) {
    let rows = state.pageMetadata.layout.layoutConfigData.rows;
    rows.splice(rows.findIndex(item => item.id === rowId), 1);
    let layoutItems = state.pageMetadata.layout.layoutItems;
    for (let i = 0; i < layoutItems.length; i++) {
      if(layoutItems[i].layoutItemConfigData.rowId === rowId) {
        layoutItems.splice(i, 1);
        i--
      }
    }
  },

  /**
   * 设置响应式布局行配置中的列间隔
   * @param state
   * @param payload
   */
  setRowGutter (state, payload) {
    let obj = state.pageMetadata.layout.layoutConfigData.rows.find(o=>o.id==payload.rowId)
    obj.gutter = payload.gutter
  },


  setRightSidebarComponentName (state, compName) {
    state.rightSidebarComponentName = compName
  },
  setCurrentSelectLayoutItemId (state, layoutItemId) {
    state.currentSelectLayoutItemId = layoutItemId;
  },
  updateLayoutItem (state, field) {
    updateField(state.pageMetadata.layout.layoutItems.find(o=>o.id==state.currentSelectLayoutItemId), field);
  },


  setRightSidebarFuncCompConfigFormName (state, payload) {
    state.rightSidebarFuncCompConfigFormName = payload
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

