import Vue from 'vue'
import Vuex from 'vuex'
import PersistantState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [PersistantState()],
  state: {
    categories: null,
    product: {},
    cart: []
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories
    },
    product (state, product) {
      state.product = product
    },
    addToCart (state, product) {
      state.cart.push(product)
    },
    removeFromCart (state, sku) {
      state.cart = state.cart.filter((product) => product.sku !== sku)
    }
  }
})
