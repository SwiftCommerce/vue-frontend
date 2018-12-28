import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: null
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories
    }
  }
})
