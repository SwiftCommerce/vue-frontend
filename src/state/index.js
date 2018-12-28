import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    categories (state, categories) {
      state.categories = categories
    }
  }
})
