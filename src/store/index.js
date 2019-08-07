import Vue from 'vue'
import Vuex from 'vuex'

import designer from './modules/designer'
import release from './modules/release'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    designer: designer,
    release: release
  },
  strict: debug,
})
