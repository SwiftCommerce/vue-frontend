import Vue from 'vue'
import Vuex from 'vuex'
import PersistantState from 'vuex-persistedstate'

import cart from './cart'
import auth from './auth'
import address from './address'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [PersistantState()],
  state: {
    orderID: null,
    categories: null,
    product: {}
  },
  mutations: {
    orderID (state, id) {
      state.orderID = id
    },
    categories (state, categories) {
      state.categories = categories
    },
    product (state, product) {
      state.product = product
    }
  },
  modules: {
    cart: cart,
    auth: auth,
    address: address
  }
})
