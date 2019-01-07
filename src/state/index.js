import Vue from 'vue'
import Vuex from 'vuex'
import PersistantState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [PersistantState()],
  state: {
    categories: null,
    product: {},
    cart: [],
    address: {
      billing: null,
      shipping: null
    }
  },
  mutations: {
    categories (state, categories) {
      state.categories = categories
    },
    product (state, product) {
      state.product = product
    },

    addToCart (state, item) {
      var index = state.cart.findIndex((i) => i.product.sku === item.product.sku)
      if (index >= 0) {
        state.cart[index].count += item.count
      } else {
        state.cart.push(item)
      }
    },
    removeFromCart (state, sku) {
      state.cart = state.cart.filter((item) => item.product.sku !== sku)
    },
    cartItemCount (state, item) {
      var index = state.cart.findIndex((i) => i.product.sku === item.product.sku)
      state.cart[index].count = item.count
    },

    billingAddress (state, address) {
      state.address.billing = address
    },
    shippingAddress (state, address) {
      state.address.shipping = address
    }
  }
})
