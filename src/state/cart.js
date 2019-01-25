export default {
  namespaced: true,
  state: [],
  mutations: {
    add (state, item) {
      var index = state.findIndex((i) => i.product.sku === item.product.sku)
      if (index >= 0) {
        state[index].count += item.count
      } else {
        state.push(item)
      }
    },
    remove (state, sku) {
      state.cart = state.filter((item) => item.product.sku !== sku)
    },
    itemCount (state, item) {
      var index = state.findIndex((i) => i.product.sku === item.product.sku)
      state[index].count = item.count
    },
    empty (state) {
      state = []
    }
  }
}
