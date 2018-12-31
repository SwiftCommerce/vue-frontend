import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: null,
    product: {}
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories
    },
    product (state, product) {
      state.product = product
    }
  }
})
