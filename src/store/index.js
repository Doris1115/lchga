import Vue from 'vue'
import Vuex from 'vuex'
import dic from './modules/dic'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    dic,
  },
  getters,
})

export default store
