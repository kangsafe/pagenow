
import { getField, updateField } from 'vuex-map-fields';
import PnApi from "../../api/PnApi";

const state = {
  pageMetadata: null
};

const getters = {
  getField,

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

  setPageMetadata (state, payload) {
    state.pageMetadata = payload
  },


};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

