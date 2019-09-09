
import { getField, updateField } from 'vuex-map-fields';

const state = {
  projectInfo: null,
  pageMetadata: null
};

const getters = {
  getField,

  getProjectInfo (state) {
    return state.projectInfo
  },

  /**
   * 根据布局块的ID获取布局块对象
   * @param state
   * @returns {function(*): *}
   */
  getLayoutItemById: (state) => (id) => {
    return state.pageMetadata.layout.layoutItems.find(o=>o.id==id)
  }
};

const actions = {

};

const mutations = {
  updateField,

  setProjectInfo (state, payload) {
    state.projectInfo = payload
  },

  setPageMetadata (state, payload) {
    state.pageMetadata = payload
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

